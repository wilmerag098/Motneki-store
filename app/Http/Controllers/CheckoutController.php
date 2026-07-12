<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Direccion;
use App\Models\Pedido;
use App\Models\DetallePedido;
use App\Models\Pago;
use App\Models\Producto;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function index()
    {
        return Inertia::render('checkout');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:100',
            'pais' => 'required|string|max:100',
            'codigo_postal' => 'required|string|max:20',
            'metodo_envio' => 'required|string',
            'metodo_pago' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|integer|exists:productos,id_producto',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
        ]);

        try {
            DB::beginTransaction();

            $user = auth()->user();
            if (!$user) {
                return redirect()->back()->withErrors(['error' => 'Debes iniciar sesión para finalizar la compra.']);
            }
            
            // 1. Crear Dirección
            $direccion = Direccion::create([
                'id_usuario' => $user->id_usuario,
                'direccion' => $validated['direccion'],
                'ciudad' => $validated['ciudad'],
                'pais' => $validated['pais'],
                'codigo_postal' => $validated['codigo_postal'],
            ]);

            // Determinar si hay alguna preventa y calcular subtotal
            $subtotal = 0;
            $hasPreventa = false;
            foreach ($validated['items'] as $item) {
                $subtotal += $item['price'] * $item['quantity'];
                $producto = Producto::find($item['id']);
                if ($producto && $producto->tipo_producto === 'preventa') {
                    $hasPreventa = true;
                    // Lógica opcional de reducir límite de preventa si existe
                    if (!is_null($producto->limite_preventa) && $producto->limite_preventa >= $item['quantity']) {
                        $producto->decrement('limite_preventa', $item['quantity']);
                    }
                }
            }

            // Costo de envío según el método
            $costoEnvio = $validated['metodo_envio'] === 'express' ? 15.00 : 0.00;
            $totalPedido = $subtotal + $costoEnvio;

            // 2. Crear Pedido (Marcando si es preventa)
            $pedido = Pedido::create([
                'id_usuario' => $user->id_usuario,
                'id_direccion' => $direccion->id_direccion,
                'total' => $totalPedido,
                'tipo_pedido' => $hasPreventa ? 'preventa' : 'normal',
                'estado' => $hasPreventa ? 'pendiente_disponibilidad' : 'pagado',
                'codigo_seguimiento' => 'TRK-' . strtoupper(substr(uniqid(), -6)),
                'fecha_creacion' => now(),
            ]);

            // 3. Crear Detalles del Pedido
            foreach ($validated['items'] as $item) {
                DetallePedido::create([
                    'id_pedido' => $pedido->id_pedido,
                    'id_producto' => $item['id'],
                    'cantidad' => $item['quantity'],
                    'precio_unitario' => $item['price'],
                ]);
            }

            // 4. Crear registro de Pago
            Pago::create([
                'id_pedido' => $pedido->id_pedido,
                'metodo' => $validated['metodo_pago'],
                'estado' => 'pagado',
                'monto' => $totalPedido,
                'fecha_pago' => now(),
            ]);

            DB::commit();

            return redirect()->route('dashboard')->with('success', '¡Pedido procesado con éxito! Puedes ver el estado en tus Envíos.');
            
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Error al procesar el pago: ' . $e->getMessage()]);
        }
    }
}
