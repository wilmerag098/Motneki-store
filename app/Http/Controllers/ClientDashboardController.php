<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // 1. Obtener los pedidos con sus detalles y productos
        // Se separarán en "Stock" y "Preventa" usando una colección
        $pedidos = $user->pedidos()->with(['detalles.producto', 'pago'])->latest()->get();

        $pedidosPreventa = [];
        $pedidosStock = [];

        foreach ($pedidos as $pedido) {
            // Revisamos si algún producto en los detalles es preventa
            $esPreventa = $pedido->detalles->contains(function ($detalle) {
                return $detalle->producto && $detalle->producto->tipo_producto === 'preventa';
            });

            if ($esPreventa) {
                $pedidosPreventa[] = $pedido;
            } else {
                $pedidosStock[] = $pedido;
            }
        }

        // 2. Obtener las Solicitudes Personalizadas
        $solicitudes = $user->solicitudesPersonalizadas()->latest('fecha_creacion')->get();

        // 3. Obtener las direcciones
        $direcciones = $user->direcciones()->get();

        return Inertia::render('dashboard', [
            'auth' => ['user' => $user],
            'pedidosPreventa' => $pedidosPreventa,
            'pedidosStock' => $pedidosStock,
            'solicitudes' => $solicitudes,
            'direcciones' => $direcciones,
        ]);
    }
}
