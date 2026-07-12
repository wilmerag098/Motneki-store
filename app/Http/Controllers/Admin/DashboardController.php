<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Métricas principales
        $metrics = [
            'ventas_dia' => 4580.50,
            'variacion_dia' => '+14.2%',
            'ventas_mes' => 24580.50,
            'pedidos_activos' => 342,
            'pedidos_pendientes' => 12,
            'envios_activos' => 45, 
            'envios_retrasados' => 3,
        ];

        // Productos con bajo stock
        $stockCritico = [
            ['id' => 1, 'nombre' => 'Figuarts Goku 2.0', 'stock' => 1],
            ['id' => 2, 'nombre' => 'Statue 1/4 Tifa', 'stock' => 0],
            ['id' => 3, 'nombre' => 'Kit MG Barbatos', 'stock' => 2],
        ];

        // Últimos pedidos
        $pedidosRecientes = [
            ['id' => 'MTN-8821', 'cliente' => 'Arisaka.K', 'estado' => 'PROCESANDO', 'monto' => 890.00],
            ['id' => 'MTN-8794', 'cliente' => 'Saito_V', 'estado' => 'ENVIADO', 'monto' => 245.00],
            ['id' => 'MTN-8790', 'cliente' => 'Maria R.', 'estado' => 'PAGADO', 'monto' => 150.00],
            ['id' => 'MTN-8788', 'cliente' => 'Luis G.', 'estado' => 'ENTREGADO', 'monto' => 340.50],
        ];

        // Productos populares
        $masVendidos = [
            ['id' => 1, 'nombre' => 'Estatua Cyberpunk 2077', 'marca' => 'ESC. 1/6 PREMIUM', 'vendidos' => 42, 'img' => 'https://images.unsplash.com/photo-1608248593845-a4f66d499fc2?w=100&auto=format&fit=crop&q=80'],
            ['id' => 2, 'nombre' => 'Gundam Aerial Full Mech', 'marca' => 'BANDAI NAMCO', 'vendidos' => 38, 'img' => 'https://images.unsplash.com/photo-1580436541355-6679549f29c4?w=100&auto=format&fit=crop&q=80'],
            ['id' => 3, 'nombre' => 'Figura Nendoroid Zero Two', 'marca' => 'GOOD SMILE', 'vendidos' => 35, 'img' => 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=100&auto=format&fit=crop&q=80'],
        ];

        return Inertia::render('admin/dashboard', [
            'metrics' => $metrics,
            'stockCritico' => $stockCritico,
            'pedidosRecientes' => $pedidosRecientes,
            'masVendidos' => $masVendidos
        ]);
    }
}
