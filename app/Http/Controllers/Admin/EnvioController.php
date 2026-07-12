<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnvioController extends Controller
{
    public function index()
    {
        // Datos de prueba (Dummy Data) para el diseño
        $enviosMock = [
            'data' => [
                [
                    'id' => 1,
                    'codigo_pedido' => 'PED-1045',
                    'cliente' => 'Ana Torres',
                    'direccion' => 'Av. Principal 123, Dpto 4, Lima',
                    'codigo_seguimiento' => 'TRK-9X8Y7Z',
                    'estado' => 'Pendiente', 
                    'fecha' => '2026-07-11',
                ],
                [
                    'id' => 2,
                    'codigo_pedido' => 'PED-1044',
                    'cliente' => 'Carlos Mendoza',
                    'direccion' => 'Calle Las Flores 456, Arequipa',
                    'codigo_seguimiento' => 'TRK-1A2B3C',
                    'estado' => 'Preparando',
                    'fecha' => '2026-07-10',
                ],
                [
                    'id' => 3,
                    'codigo_pedido' => 'PED-1043',
                    'cliente' => 'Lucía Gómez',
                    'direccion' => 'Urb. El Sol, Mz B Lote 3, Piura',
                    'codigo_seguimiento' => 'TRK-5H6J7K',
                    'estado' => 'Enviado',
                    'fecha' => '2026-07-09',
                ],
                [
                    'id' => 4,
                    'codigo_pedido' => 'PED-1040',
                    'cliente' => 'Miguel Vargas',
                    'direccion' => 'Av. Ejército 789, Cusco',
                    'codigo_seguimiento' => 'TRK-2W3E4R',
                    'estado' => 'Entregado',
                    'fecha' => '2026-07-05',
                ],
            ],
            'links' => [] // Para simular paginación vacía
        ];

        return Inertia::render('admin/envios', [
            'envios' => $enviosMock
        ]);
    }

    public function registrarTracking(Request $request)
    {
        $request->validate([
            'id_solicitud' => 'required|string',
            'empresa_logistica' => 'required|string',
            'numero_tracking' => 'required|string',
            'fecha_entrega' => 'required|date',
        ]);

        // Simulación de éxito para los datos de prueba
        // En producción: $pedido = Pedido::where('codigo_pedido', $request->id_solicitud)->first(); $pedido->update(...);

        return redirect()->back()->with('success', 'Información de envío registrada exitosamente.');
    }

    public function marcarEntregado($id)
    {
        // En producción: $pedido = Pedido::findOrFail($id);
        // $pedido->update(['estado' => 'Entregado']);

        return redirect()->back()->with('success', 'El pedido ha sido marcado como Entregado.');
    }
}
