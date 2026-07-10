<?php

namespace App\Modules\Pedidos\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DetallePedido;
use App\Models\Direccion;
use App\Models\Pago;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PedidoController extends Controller
{
    /**
     * Muestra la vista de checkout con las direcciones del usuario.
     */
    public function checkout()
    {
        $direcciones = [];
        if (Auth::check()) {
            $direcciones = Direccion::where('id_usuario', Auth::id())->get();
        }

        return Inertia::render('modules/Pedidos/Checkout', [
            'direcciones' => $direcciones,
            'usuario' => Auth::user(),
        ]);
    }

    /**
     * Procesa la creación de un nuevo pedido.
     */
    public function crear(Request $request)
    {
        $request->validate([
            'productos' => 'required|array|min:1',
            'productos.*.id_producto' => 'required|exists:productos,id_producto',
            'productos.*.cantidad' => 'required|integer|min:1',
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:100',
            'pais' => 'required|string|max:100',
            'codigo_postal' => 'required|string|max:20',
            'metodo_pago' => 'required|string',
            'tipo_pago' => 'required|in:total,adelanto', // total o adelanto parcial
        ]);

        $usuario = Auth::user();
        if (! $usuario) {
            return back()->withErrors(['auth' => 'Debes iniciar sesión para realizar un pedido.']);
        }

        try {
            return DB::transaction(function () use ($request, $usuario) {
                // 1. Validar stock e inventario de cada producto
                $productosSolicitados = [];
                $total = 0;
                $contienePreventa = false;
                $contieneProxy = false;

                foreach ($request->input('productos') as $item) {
                    $producto = Producto::lockForUpdate()->find($item['id_producto']);

                    // Regla de Negocio: Validar stock antes del checkout para productos en stock propio
                    if ($producto->disponibilidad === 'stock') {
                        if ($producto->stock < $item['cantidad']) {
                            throw new \Exception("Stock insuficiente para: {$producto->nombre}. Quedan {$producto->stock} unidades.");
                        }
                        // Descontar del inventario
                        $producto->decrement('stock', $item['cantidad']);
                    } elseif ($producto->disponibilidad === 'preventa') {
                        $contienePreventa = true;
                    } elseif ($producto->disponibilidad === 'bajo_demanda' || $producto->disponibilidad === 'bajo demanda') {
                        $contieneProxy = true;
                    }

                    $total += $producto->precio * $item['cantidad'];
                    $productosSolicitados[] = [
                        'producto' => $producto,
                        'cantidad' => $item['cantidad'],
                        'precio_unitario' => $producto->precio,
                    ];
                }

                // 2. Registrar o buscar Dirección de Envío
                $direccion = Direccion::firstOrCreate([
                    'id_usuario' => $usuario->id_usuario,
                    'direccion' => $request->input('direccion'),
                    'ciudad' => $request->input('ciudad'),
                    'pais' => $request->input('pais'),
                    'codigo_postal' => $request->input('codigo_postal'),
                ]);

                // 3. Crear el Pedido
                // Si contiene pedidos proxy (bajo demanda), requiere cotización previa del administrador
                $estadoPedido = 'pendiente';
                if ($contieneProxy) {
                    $estadoPedido = 'cotizacion_pendiente';
                }

                $pedido = Pedido::create([
                    'id_usuario' => $usuario->id_usuario,
                    'id_direccion' => $direccion->id_direccion,
                    'total' => $total,
                    'estado' => $estadoPedido,
                    'codigo_seguimiento' => 'MTK-'.strtoupper(bin2hex(random_bytes(4))),
                    'fecha_creacion' => now(),
                ]);

                // 4. Crear Detalles del Pedido
                foreach ($productosSolicitados as $item) {
                    DetallePedido::create([
                        'id_pedido' => $pedido->id_pedido,
                        'id_producto' => $item['producto']->id_producto,
                        'cantidad' => $item['cantidad'],
                        'precio_unitario' => $item['precio_unitario'],
                    ]);
                }

                // 5. Crear Registro de Pago (si no es cotización pendiente)
                if ($estadoPedido !== 'cotizacion_pendiente') {
                    $montoPago = $total;

                    // Regla de negocio: Preventas permiten pagos parciales (adelantos)
                    if ($contienePreventa && $request->input('tipo_pago') === 'adelanto') {
                        $montoPago = $total * 0.30; // 30% de adelanto
                    }

                    $pago = Pago::create([
                        'id_pedido' => $pedido->id_pedido,
                        'metodo' => $request->input('metodo_pago'),
                        'estado' => 'pendiente', // Se confirma por el admin o la pasarela
                        'monto' => $montoPago,
                        'fecha_pago' => null,
                    ]);
                }

                return redirect()->route('pedidos.seguimiento', ['codigo' => $pedido->codigo_seguimiento])
                    ->with('success', 'Pedido registrado correctamente.');
            });
        } catch (\Exception $e) {
            return back()->withErrors(['checkout' => $e->getMessage()]);
        }
    }

    /**
     * Muestra la trazabilidad de un pedido mediante su código de seguimiento.
     */
    public function seguimiento($codigo)
    {
        $pedido = Pedido::with(['detalles.producto', 'direccion', 'pago', 'usuario'])
            ->where('codigo_seguimiento', $codigo)
            ->firstOrFail();

        return Inertia::render('modules/Pedidos/Seguimiento', [
            'pedido' => $pedido,
        ]);
    }

    /**
     * Panel de administración de pedidos.
     */
    public function panelAdmin()
    {
        $pedidos = Pedido::with(['usuario', 'direccion', 'detalles.producto', 'pago'])
            ->orderBy('id_pedido', 'desc')
            ->get();

        return Inertia::render('modules/Pedidos/AdminPedidos', [
            'pedidos' => $pedidos,
        ]);
    }

    /**
     * Acción del admin para actualizar el estado del pedido o establecer el código de seguimiento.
     */
    public function actualizarEstado(Request $request, $id)
    {
        $pedido = Pedido::findOrFail($id);

        $request->validate([
            'estado' => 'required|in:pendiente,pagado,enviado,entregado,cotizado',
            'codigo_seguimiento' => 'nullable|string',
            'cotizacion' => 'nullable|numeric',
        ]);

        if ($request->filled('estado')) {
            $pedido->estado = $request->input('estado');
        }

        if ($request->filled('codigo_seguimiento')) {
            $pedido->codigo_seguimiento = $request->input('codigo_seguimiento');
        }

        if ($request->input('estado') === 'pagado') {
            // Confirmar también el pago asociado
            $pago = Pago::where('id_pedido', $pedido->id_pedido)->first();
            if ($pago) {
                $pago->update([
                    'estado' => 'pagado',
                    'fecha_pago' => now(),
                ]);
            }
        }

        $pedido->save();

        return back()->with('success', 'Pedido actualizado correctamente.');
    }
}
