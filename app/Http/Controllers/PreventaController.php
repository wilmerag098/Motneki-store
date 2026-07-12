<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PreventaController extends Controller
{
    /**
     * Display the preventas page.
     */
    public function index(Request $request)
    {
        // 1. Hero Product: El más reciente o destacado en preventa
        $heroProduct = Producto::with('categoria')
            ->where('activo', true)
            ->where('tipo_producto', 'preventa')
            ->latest('id_producto')
            ->first();

        // 2. Top Preventas: 3 productos en preventa más caros o destacados
        $topPreventasQuery = Producto::with('categoria')
            ->where('activo', true)
            ->where('tipo_producto', 'preventa');
            
        if ($heroProduct) {
            $topPreventasQuery->where('id_producto', '!=', $heroProduct->id_producto);
        }

        $topPreventas = $topPreventasQuery
            ->orderBy('precio', 'desc')
            ->take(3)
            ->get();

        // 3. Grid de Preventas (Paginado)
        $excludedIds = collect();
        if ($heroProduct) $excludedIds->push($heroProduct->id_producto);
        $excludedIds = $excludedIds->concat($topPreventas->pluck('id_producto'));

        $productos = Producto::with('categoria')
            ->where('activo', true)
            ->where('tipo_producto', 'preventa')
            ->whereNotIn('id_producto', $excludedIds)
            ->latest('id_producto')
            ->paginate(8)
            ->withQueryString();

        return Inertia::render('preventas', [
            'heroProduct' => $heroProduct,
            'topPreventas' => $topPreventas,
            'productos' => $productos,
        ]);
    }
}
