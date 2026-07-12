<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ExclusivoController extends Controller
{
    /**
     * Display the exclusivos page.
     */
    public function index(Request $request)
    {
        // 1. Hero Product: El más destacado en exclusivos (el más caro o reciente)
        $heroProduct = Producto::with('categoria')
            ->where('activo', true)
            ->where('tipo_producto', 'exclusivo')
            ->orderBy('precio', 'desc')
            ->first();

        // 2. Top Exclusivos: Siguientes 3 productos exclusivos más caros para "Rarezas del mes"
        $topExclusivosQuery = Producto::with('categoria')
            ->where('activo', true)
            ->where('tipo_producto', 'exclusivo');
            
        if ($heroProduct) {
            $topExclusivosQuery->where('id_producto', '!=', $heroProduct->id_producto);
        }

        $topExclusivos = $topExclusivosQuery
            ->orderBy('precio', 'desc')
            ->take(3)
            ->get();

        // 3. Grid de Exclusivos (Paginado)
        $excludedIds = collect();
        if ($heroProduct) $excludedIds->push($heroProduct->id_producto);
        $excludedIds = $excludedIds->concat($topExclusivos->pluck('id_producto'));

        $productos = Producto::with('categoria')
            ->where('activo', true)
            ->where('tipo_producto', 'exclusivo')
            ->whereNotIn('id_producto', $excludedIds)
            ->latest('id_producto')
            ->paginate(8)
            ->withQueryString();

        return Inertia::render('exclusivos', [
            'heroProduct' => $heroProduct,
            'topExclusivos' => $topExclusivos,
            'productos' => $productos,
        ]);
    }
}
