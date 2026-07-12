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
        $filtros = $request->only([
            'buscar', 
            'categoria',
            'precio_min', 
            'precio_max', 
            'disponibilidad', // Solo disponibles, Incluir sin stock
            'tipos',          // Stock, Preventa, Exclusivo
            'materiales', 
            'valoracion', 
            'destacados',     // oferta, vendidos, nuevos
            'tamanos', 
            'orden'
        ]);

        $query = Producto::with('categoria')->where('activo', true);

        if (!empty($filtros['categoria'])) {
            $query->whereHas('categoria', function ($q) use ($filtros) {
                $q->where('nombre', $filtros['categoria']);
            });
        }

        if (!empty($filtros['buscar'])) {
            $query->where('nombre', 'like', "%{$filtros['buscar']}%");
        }

        if (isset($filtros['precio_min'])) {
            $query->where('precio', '>=', $filtros['precio_min']);
        }

        if (isset($filtros['precio_max'])) {
            $query->where('precio', '<=', $filtros['precio_max']);
        }

        // Disponibilidad: 'incluir_sin_stock' means we don't filter out stock <= 0
        // 'solo_disponibles' means stock > 0.
        // Let's assume if 'solo_disponibles' is in the array, we filter
        if (!empty($filtros['disponibilidad'])) {
            if (in_array('solo_disponibles', $filtros['disponibilidad'])) {
                $query->where('stock', '>', 0);
            }
        }

        if (!empty($filtros['tipos'])) {
            $query->whereIn('tipo_producto', $filtros['tipos']);
        }

        if (!empty($filtros['materiales'])) {
            $query->whereIn('material', $filtros['materiales']);
        }

        if (!empty($filtros['tamanos'])) {
            $query->whereIn('tamano', $filtros['tamanos']);
        }

        if (!empty($filtros['valoracion'])) {
            $query->where('valoracion', '>=', $filtros['valoracion']);
        }

        if (!empty($filtros['destacados'])) {
            if (in_array('oferta', $filtros['destacados'])) {
                $query->where('en_oferta', true);
            }
            if (in_array('nuevos', $filtros['destacados'])) {
                $query->where('es_nuevo', true);
            }
            // vendidos could just be ordering, or we can say ventas > 10. We'll handle ordering below.
        }

        // Ordenamiento
        $orden = $filtros['orden'] ?? 'recientes';
        switch ($orden) {
            case 'precio_asc':
                $query->orderBy('precio', 'asc');
                break;
            case 'precio_desc':
                $query->orderBy('precio', 'desc');
                break;
            case 'vendidos':
                $query->orderBy('ventas', 'desc');
                break;
            case 'recientes':
            default:
                $query->orderBy('id_producto', 'desc');
                break;
        }

        $productos = $query->paginate(6)->withQueryString();
        $categorias = Categoria::where('activo', true)->get();

        return Inertia::render('modules/Catalogo/Index', [
            'productos' => $productos,
            'categorias' => $categorias,
            'filtros' => $filtros,
        ]);
    }

    /**
     * Muestra la página de detalle de un producto.
     */
    public function show($id)
    {
        $producto = Producto::with('categoria')->findOrFail($id);
        
        // Productos relacionados (misma categoría o aleatorios)
        $relacionados = Producto::with('categoria')
            ->where('activo', true)
            ->where('id_producto', '!=', $id)
            ->where('id_categoria', $producto->id_categoria)
            ->inRandomOrder()
            ->take(4)
            ->get();
            
        // Si no hay suficientes en la misma categoría, llenar con otros
        if ($relacionados->count() < 4) {
            $extra = Producto::with('categoria')
                ->where('activo', true)
                ->where('id_producto', '!=', $id)
                ->whereNotIn('id_producto', $relacionados->pluck('id_producto'))
                ->inRandomOrder()
                ->take(4 - $relacionados->count())
                ->get();
            $relacionados = $relacionados->concat($extra);
        }

        return Inertia::render('modules/Catalogo/Show', [
            'producto' => $producto,
            'relacionados' => $relacionados
        ]);
    }
}
