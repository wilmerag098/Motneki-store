<?php

namespace App\Modules\Catalogo\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    /**
     * Muestra la lista de productos de la tienda con filtros.
     */
    public function index(Request $request)
    {
        $buscar = $request->input('buscar');
        $categoriaId = $request->input('categoria_id');
        $disponibilidad = $request->input('disponibilidad'); // stock, preventa, bajo demanda

        $query = Producto::with('categoria')->where('activo', true);

        if ($buscar) {
            $query->where('nombre', 'like', "%{$buscar}%");
        }

        if ($categoriaId) {
            $query->where('id_categoria', $categoriaId);
        }

        if ($disponibilidad) {
            $query->where('disponibilidad', $disponibilidad);
        }

        $productos = $query->orderBy('id_producto', 'desc')->get();
        $categorias = Categoria::where('activo', true)->get();

        return Inertia::render('modules/Catalogo/Index', [
            'productos' => $productos,
            'categorias' => $categorias,
            'filtros' => [
                'buscar' => $buscar,
                'categoria_id' => $categoriaId,
                'disponibilidad' => $disponibilidad,
            ],
        ]);
    }
}
