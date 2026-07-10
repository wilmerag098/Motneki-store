<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;

class PedidoController extends Controller
{
    public function index()
    {
        $pedidos = Pedido::with(['usuario', 'pago'])->orderBy('fecha_creacion', 'desc')->paginate(10);

        // KPIs Calculations
        $totalPedidos = Pedido::count(); // Mes actual en una app real
        $pedidosPendientes = Pedido::where('estado', 'pendiente')->count();
        $ingresosTotales = Pedido::whereIn('estado', ['pagado', 'enviado', 'entregado'])->sum('total');
        
        $tasaEntrega = $totalPedidos > 0 
            ? round((Pedido::where('estado', 'entregado')->count() / $totalPedidos) * 100, 1) 
            : 0;

        return Inertia::render('admin/pedidos', [
            'pedidos' => $pedidos,
            'kpis' => [
                'totalPedidos' => $totalPedidos,
                'pedidosPendientes' => $pedidosPendientes,
                'ingresosTotales' => $ingresosTotales,
                'tasaEntrega' => $tasaEntrega,
            ]
        ]);
    }

    public function exportCsv()
    {
        $pedidos = Pedido::with(['usuario', 'pago'])->orderBy('fecha_creacion', 'desc')->get();

        $csvFileName = 'pedidos_' . date('Y-m-d') . '.csv';
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$csvFileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['ID_PEDIDO', 'CLIENTE_NOMBRE', 'CLIENTE_EMAIL', 'FECHA', 'TOTAL', 'METODO_PAGO', 'ESTADO'];

        $callback = function() use($pedidos, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($pedidos as $pedido) {
                $row = [
                    '#MTN-' . str_pad($pedido->id_pedido, 4, '0', STR_PAD_LEFT),
                    $pedido->usuario ? $pedido->usuario->nombre : 'N/A',
                    $pedido->usuario ? $pedido->usuario->email : 'N/A',
                    $pedido->fecha_creacion ? date('d M, Y', strtotime($pedido->fecha_creacion)) : 'N/A',
                    $pedido->total,
                    $pedido->pago ? strtoupper($pedido->pago->metodo) : 'N/A',
                    strtoupper($pedido->estado)
                ];
                fputcsv($file, $row);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
