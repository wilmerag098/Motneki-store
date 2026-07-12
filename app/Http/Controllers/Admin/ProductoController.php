<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::with('categoria')->orderBy('fecha_creacion', 'desc')->get();
        return Inertia::render('admin/productos', [
            'productos' => $productos
        ]);
    }

    public function create()
    {
        $categorias = Categoria::all();
        return Inertia::render('admin/crear-producto', [
            'categorias' => $categorias
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'id_categoria' => 'required|exists:categorias,id_categoria',
            'fabricante' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'activo' => 'boolean',
            'en_oferta' => 'boolean',
            'es_nuevo' => 'boolean',
            'material' => 'nullable|string|max:255',
            'tamano' => 'nullable|string|max:255',
            'tipo_producto' => 'required|in:stock,preventa,exclusivo',
            'fecha_inicio_preventa' => 'nullable|date',
            'fecha_fin_preventa' => 'nullable|date',
            'fecha_disponibilidad' => 'nullable|date',
            'tipo_pago_preventa' => 'nullable|in:completo,parcial',
            'porcentaje_anticipo' => 'nullable|numeric|min:1|max:99',
            'limite_preventa' => 'nullable|integer|min:1',
            'imagen' => 'nullable|image|max:10240', // max 10MB
        ]);

        $producto = new Producto($validated);
        $producto->activo = $request->boolean('activo', true);
        $producto->en_oferta = $request->boolean('en_oferta', false);
        $producto->es_nuevo = $request->boolean('es_nuevo', true);

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('productos', 'public');
            $producto->imagen_url = '/storage/' . $path;
        }

        $producto->save();

        return redirect()->route('admin.productos')->with('success', 'Producto creado exitosamente.');
    }

    public function edit($id)
    {
        $producto = Producto::findOrFail($id);
        $categorias = Categoria::all();

        return Inertia::render('admin/editar-producto', [
            'producto' => $producto,
            'categorias' => $categorias
        ]);
    }

    public function update(Request $request, $id)
    {
        \Illuminate\Support\Facades\Log::info('Update Request for product ' . $id, $request->all());
        $producto = Producto::findOrFail($id);

        try {
            $validated = $request->validate([
                'nombre' => 'required|string|max:255',
                'id_categoria' => 'required|exists:categorias,id_categoria',
                'fabricante' => 'nullable|string|max:255',
                'descripcion' => 'nullable|string',
                'precio' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'activo' => 'boolean',
                'en_oferta' => 'boolean',
                'es_nuevo' => 'boolean',
                'material' => 'nullable|string|max:255',
                'tamano' => 'nullable|string|max:255',
                'tipo_producto' => 'required|in:stock,preventa,exclusivo',
                'fecha_inicio_preventa' => 'nullable|date',
                'fecha_fin_preventa' => 'nullable|date',
                'fecha_disponibilidad' => 'nullable|date',
                'tipo_pago_preventa' => 'nullable|in:completo,parcial',
                'porcentaje_anticipo' => 'nullable|numeric|min:1|max:99',
                'limite_preventa' => 'nullable|integer|min:1',
                'imagen' => 'nullable|image|max:10240',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Illuminate\Support\Facades\Log::error('Validation failed: ', $e->errors());
            throw $e;
        }

        $producto->fill($validated);
        $producto->activo = $request->boolean('activo', true);
        $producto->en_oferta = $request->boolean('en_oferta', false);
        $producto->es_nuevo = $request->boolean('es_nuevo', true);

        if ($request->hasFile('imagen')) {
            // Delete old image if exists
            if ($producto->imagen_url) {
                $oldPath = str_replace('/storage/', '', $producto->imagen_url);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
            $path = $request->file('imagen')->store('productos', 'public');
            $producto->imagen_url = '/storage/' . $path;
        }

        $producto->save();

        return redirect()->route('admin.productos')->with('success', 'Producto actualizado exitosamente.');
    }

    public function destroy($id)
    {
        $producto = Producto::findOrFail($id);
        
        if ($producto->imagen_url) {
            $oldPath = str_replace('/storage/', '', $producto->imagen_url);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        $producto->delete();

        return redirect()->route('admin.productos')->with('success', 'Producto eliminado exitosamente.');
    }
}
