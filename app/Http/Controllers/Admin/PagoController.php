<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pago;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagoController extends Controller
{
    public function index()
    {
        $pagos = Pago::with('pedido.usuario')->orderBy('fecha_pago', 'desc')->paginate(10);

        $totalRecaudado = Pago::whereIn('estado', ['pagado', 'aprobado'])->sum('monto');
        $pendientesConfirmar = Pago::where('estado', 'pendiente')->count();
        $pagosRechazados = Pago::whereIn('estado', ['fallido', 'rechazado'])->count();
        
        $totalPagos = Pago::count();
        $tasaAprobacion = $totalPagos > 0 
            ? round((Pago::whereIn('estado', ['pagado', 'aprobado'])->count() / $totalPagos) * 100, 1) 
            : 0;

        return Inertia::render('admin/pagos', [
            'pagos' => $pagos,
            'kpis' => [
                'totalRecaudado' => $totalRecaudado,
                'pendientesConfirmar' => $pendientesConfirmar,
                'tasaAprobacion' => $tasaAprobacion,
                'pagosRechazados' => $pagosRechazados,
            ]
        ]);
    }

    public function exportCsv()
    {
        $pagos = Pago::with('pedido.usuario')->orderBy('fecha_pago', 'desc')->get();

        $csvFileName = 'pagos_' . date('Y-m-d') . '.csv';
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$csvFileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['ID_PAGO', 'CLIENTE_NOMBRE', 'CLIENTE_EMAIL', 'FECHA_HORA', 'MONTO', 'METODO', 'COMPROBANTE', 'ESTADO'];

        $callback = function() use($pagos, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($pagos as $pago) {
                $usuario = $pago->pedido && $pago->pedido->usuario ? $pago->pedido->usuario : null;
                $row = [
                    '#PAY-' . str_pad($pago->id_pago, 4, '0', STR_PAD_LEFT),
                    $usuario ? $usuario->nombre : 'N/A',
                    $usuario ? $usuario->email : 'N/A',
                    $pago->fecha_pago ? date('d M Y H:i', strtotime($pago->fecha_pago)) : 'N/A',
                    $pago->monto,
                    strtoupper($pago->metodo),
                    'Automático', // Simplificado por ahora
                    strtoupper($pago->estado)
                ];
                fputcsv($file, $row);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
