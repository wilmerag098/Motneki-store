<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReporteController extends Controller
{
    public function index(Request $request)
    {
        $fechaDesde = $request->input('fecha_desde');
        $fechaHasta = $request->input('fecha_hasta');
        $tipoReporte = $request->input('tipo_reporte', 'Ventas');

        // 1. KPIs Globales (Simulamos variación si hay filtros)
        $kpis = [
            'ventas_totales' => 24580.50,
            'pedidos_realizados' => 842,
            'usuarios_registrados' => 356,
            'productos_vendidos' => 1290,
            'ticket_promedio' => 29.20
        ];

        // 2. Data para Gráficos
        $charts = [
            'ventas_por_mes' => [
                ['name' => 'Ene', 'ventas' => 1500],
                ['name' => 'Feb', 'ventas' => 2300],
                ['name' => 'Mar', 'ventas' => 3400],
                ['name' => 'Abr', 'ventas' => 2900],
                ['name' => 'May', 'ventas' => 4500],
                ['name' => 'Jun', 'ventas' => 5800],
                ['name' => 'Jul', 'ventas' => 4180.50],
            ],
            'ingresos_vs_pedidos' => [
                ['name' => 'Sem 1', 'ingresos' => 1200, 'pedidos' => 45],
                ['name' => 'Sem 2', 'ingresos' => 2100, 'pedidos' => 85],
                ['name' => 'Sem 3', 'ingresos' => 1800, 'pedidos' => 65],
                ['name' => 'Sem 4', 'ingresos' => 2900, 'pedidos' => 110],
            ],
            'productos_mas_vendidos' => [
                ['name' => 'Figura Nendoroid Zero Two', 'value' => 350],
                ['name' => 'Manga Chainsaw Man Vol 1', 'value' => 280],
                ['name' => 'Funko Pop Goku SSJ', 'value' => 210],
                ['name' => 'Poster Attack on Titan', 'value' => 150],
                ['name' => 'Katana Rengoku (Replica)', 'value' => 90],
            ],
            'estados_envios' => [
                ['name' => 'Entregados', 'value' => 600],
                ['name' => 'Enviados', 'value' => 150],
                ['name' => 'Preparando', 'value' => 70],
                ['name' => 'Retrasados', 'value' => 22],
            ]
        ];

        // 3. Data para Tablas
        $tables = [
            'top_productos' => [
                ['id' => 1, 'nombre' => 'Figura Nendoroid Zero Two', 'categoria' => 'Figuras', 'stock' => 15, 'ventas' => 350],
                ['id' => 2, 'nombre' => 'Manga Chainsaw Man Vol 1', 'categoria' => 'Mangas', 'stock' => 0, 'ventas' => 280],
                ['id' => 3, 'nombre' => 'Funko Pop Goku SSJ', 'categoria' => 'Figuras', 'stock' => 5, 'ventas' => 210],
                ['id' => 4, 'nombre' => 'Poster Attack on Titan', 'categoria' => 'Accesorios', 'stock' => 45, 'ventas' => 150],
            ],
            'ultimos_pedidos' => [
                ['id' => 'PED-1045', 'cliente' => 'Ana Torres', 'fecha' => '11 Jul, 2026', 'total' => 120.00, 'estado' => 'Pagado'],
                ['id' => 'PED-1044', 'cliente' => 'Carlos Mendoza', 'fecha' => '10 Jul, 2026', 'total' => 85.50, 'estado' => 'Pendiente'],
                ['id' => 'PED-1043', 'cliente' => 'Lucía Gómez', 'fecha' => '09 Jul, 2026', 'total' => 230.00, 'estado' => 'Pagado'],
                ['id' => 'PED-1042', 'cliente' => 'Miguel Vargas', 'fecha' => '08 Jul, 2026', 'total' => 45.00, 'estado' => 'Cancelado'],
            ],
            'usuarios_recientes' => [
                ['id' => 1, 'nombre' => 'Luis Sanchez', 'email' => 'luis@correo.com', 'fecha' => '11 Jul, 2026', 'estado' => 'Activo'],
                ['id' => 2, 'nombre' => 'María Gomez', 'email' => 'maria.g@correo.com', 'fecha' => '10 Jul, 2026', 'estado' => 'Activo'],
                ['id' => 3, 'nombre' => 'Jorge Pinto', 'email' => 'jorge.pinto@correo.com', 'fecha' => '09 Jul, 2026', 'estado' => 'Inactivo'],
            ],
            'envios_retrasados' => [
                ['id' => 'PED-0992', 'cliente' => 'Juan Perez', 'tracking' => 'TRK-9X8Y7Z', 'retraso' => '3 días', 'courier' => 'Olva Courier'],
                ['id' => 'PED-0985', 'cliente' => 'Sofia Lozano', 'tracking' => 'TRK-1A2B3C', 'retraso' => '5 días', 'courier' => 'Shalom'],
                ['id' => 'PED-0970', 'cliente' => 'Pedro Castillo', 'tracking' => 'TRK-5H6J7K', 'retraso' => '7 días', 'courier' => 'DHL'],
            ]
        ];

        // Simulamos variación si hay filtro de fechas aplicado
        if ($fechaDesde || $fechaHasta) {
            $kpis['ventas_totales'] = 15420.00;
            $kpis['pedidos_realizados'] = 450;
        }

        return Inertia::render('admin/reportes', [
            'filtros' => [
                'fecha_desde' => $fechaDesde,
                'fecha_hasta' => $fechaHasta,
                'tipo_reporte' => $tipoReporte
            ],
            'kpis' => $kpis,
            'charts' => $charts,
            'tables' => $tables
        ]);
    }

    public function exportar(Request $request)
    {
        $formato = $request->input('formato', 'excel');
        $tipoReporte = $request->input('tipo_reporte', 'Ventas');

        if ($formato === 'excel') {
            $csvFileName = "reporte_{$tipoReporte}_" . date('Y_m_d') . ".csv";
            $headers = [
                "Content-type"        => "text/csv",
                "Content-Disposition" => "attachment; filename=$csvFileName",
                "Pragma"              => "no-cache",
                "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
                "Expires"             => "0"
            ];

            // Generamos CSV simple
            $callback = function() use ($tipoReporte) {
                $file = fopen('php://output', 'w');
                // Headers
                fputcsv($file, ['ID', 'Elemento', 'Valor', 'Estado']);
                
                // Filas dummy según el tipo de reporte
                if ($tipoReporte === 'Ventas' || $tipoReporte === 'Productos') {
                    fputcsv($file, ['1', 'Figura Nendoroid Zero Two', '350 ventas', 'Activo']);
                    fputcsv($file, ['2', 'Manga Chainsaw Man Vol 1', '280 ventas', 'Sin stock']);
                } else if ($tipoReporte === 'Usuarios') {
                    fputcsv($file, ['1', 'Luis Sanchez', 'luis@correo.com', 'Activo']);
                    fputcsv($file, ['2', 'María Gomez', 'maria.g@correo.com', 'Activo']);
                } else {
                    fputcsv($file, ['PED-0992', 'Juan Perez', 'Olva Courier', 'Retrasado']);
                    fputcsv($file, ['PED-0985', 'Sofia Lozano', 'Shalom', 'Retrasado']);
                }

                fclose($file);
            };

            return response()->stream($callback, 200, $headers);
        }

        return redirect()->back();
    }
}
