<?php

namespace App\Modules\Pagos\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pago;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PagoController extends Controller
{
    /**
     * Registra un pago para un pedido específico.
     */
    public function registrarPago(Request $request, $idPedido)
    {
        $request->validate([
            'metodo' => 'required|string',
            'monto' => 'required|numeric|min:0.01',
        ]);

        $pedido = Pedido::findOrFail($idPedido);

        try {
            return DB::transaction(function () use ($request, $pedido) {
                $pago = Pago::updateOrCreate(
                    ['id_pedido' => $pedido->id_pedido],
                    [
                        'metodo' => $request->input('metodo'),
                        'estado' => 'pendiente', // Requiere aprobación manual/admin por transparencia
                        'monto' => $request->input('monto'),
                        'fecha_pago' => null,
                    ]
                );

                return back()->with('success', 'Pago registrado y en proceso de validación.');
            });
        } catch (\Exception $e) {
            return back()->withErrors(['pago' => $e->getMessage()]);
        }
    }
}
