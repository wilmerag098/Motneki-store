<?php

namespace App\Modules\Pedidos\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DetallePedido;
use App\Models\Pago;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    /**
     * Procesa la compra utilizando transacciones para asegurar la integridad (similar al Procedure realizar_compra).
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_direccion' => 'required|integer|exists:direcciones,id_direccion',
            'metodo_pago' => 'required|string|in:tarjeta,paypal,transferencia,contra_entrega',
            'productos' => 'required|array|min:1',
            'productos.*.id_producto' => 'required|integer|exists:productos,id_producto',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            // Usar el usuario autenticado, o forzar ID 1 si no hay sesión para pruebas locales
            $idUsuario = $request->user() ? $request->user()->id_usuario : 1; 
            
            // 1. Crear el pedido inicial (estado pendiente, total 0)
            $pedido = Pedido::create([
                'id_usuario' => $idUsuario,
                'id_direccion' => $request->id_direccion,
                'total' => 0,
                'estado' => 'pendiente',
            ]);

            // 2. Procesar cada producto del carrito
            foreach ($request->productos as $item) {
                // Bloqueamos la fila del producto para evitar lecturas fantasmas concurrentes (FOR UPDATE)
                $producto = Producto::where('id_producto', $item['id_producto'])->lockForUpdate()->first();

                if ($producto->stock < $item['cantidad']) {
                    throw new \Exception("Stock insuficiente para el producto: {$producto->nombre}");
                }

                // Insertar detalle. Los Triggers de BD (validar_stock, reducir_stock, actualizar_total_insert)
                // se encargarán automáticamente del stock y del total de Pedido.
                DetallePedido::create([
                    'id_pedido' => $pedido->id_pedido,
                    'id_producto' => $producto->id_producto,
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $producto->precio,
                    // subtotal es GENERATED ALWAYS AS (cantidad * precio_unitario) en MySQL
                ]);
            }

            // Los triggers de MySQL (actualizar_total_insert) sumarán el total automáticamente en la tabla Pedido.
            // Refrescamos el modelo para obtener ese nuevo total actualizado en la BD.
            $pedido->refresh();
            
            // 3. Registrar el Pago
            Pago::create([
                'id_pedido' => $pedido->id_pedido,
                'metodo' => $request->metodo_pago,
                'estado' => 'completado', // Asumimos éxito para el ejemplo
                'monto' => $pedido->total,
                'fecha_pago' => now(),
            ]);

            // 4. Confirmar el Pedido
            $pedido->update(['estado' => 'pagado']);

            DB::commit();

            return redirect()->back()->with('success', 'Compra realizada con éxito. Pedido ID: ' . $pedido->id_pedido);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error en checkout: ' . $e->getMessage());
            
            return redirect()->back()->withErrors([
                'error' => 'Error al procesar la compra: ' . $e->getMessage(),
            ]);
        }
    }
}
