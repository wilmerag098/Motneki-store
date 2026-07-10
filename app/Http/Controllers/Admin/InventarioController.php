<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventarioController extends Controller
{
    public function index()
    {
        $productos = Producto::with('categoria')->orderBy('nombre')->get();
        $categorias = Categoria::all();

        // Calcular KPIs
        $totalSKU = $productos->count();
        
        $valorInventario = $productos->reduce(function ($carry, $producto) {
            return $carry + ($producto->precio * $producto->stock);
        }, 0);

        // Umbral de stock bajo: menor o igual a 5
        $stockBajo = $productos->filter(function ($producto) {
            return $producto->stock <= 5;
        })->count();

        // Entradas del mes (Mock para coincidir con el diseño)
        $entradasMes = 342;

        return Inertia::render('admin/inventario', [
            'productos' => $productos,
            'categorias' => $categorias,
            'kpis' => [
                'totalSKU' => $totalSKU,
                'valorInventario' => $valorInventario,
                'stockBajo' => $stockBajo,
                'entradasMes' => $entradasMes,
            ]
        ]);
    }

    public function updateStock(Request $request, $id)
    {
        $request->validate([
            'stock' => 'required|integer|min:0'
        ]);

        $producto = Producto::findOrFail($id);
        $producto->stock = $request->input('stock');
        $producto->save();

        return back()->with('success', 'Stock actualizado correctamente.');
    }
}
