<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SolicitudPersonalizada;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SolicitudPersonalizadaController extends Controller
{
    public function index(Request $request)
    {
        $query = SolicitudPersonalizada::with('usuario');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nombre', 'like', '%' . $search . '%')
                  ->orWhere('descripcion', 'like', '%' . $search . '%')
                  ->orWhereHas('usuario', function($u) use ($search) {
                      $u->where('nombre', 'like', '%' . $search . '%');
                  });
            });
        }

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        $solicitudes = $query->orderBy('fecha_creacion', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('admin/solicitudes', [
            'solicitudes' => $solicitudes,
            'filters' => $request->only(['search', 'estado'])
        ]);
    }

    public function update(Request $request, $id)
    {
        $solicitud = SolicitudPersonalizada::findOrFail($id);
        
        $validated = $request->validate([
            'estado' => 'nullable|string|max:50',
            'precio_cotizado' => 'nullable|numeric|min:0',
            'comentario_admin' => 'nullable|string',
        ]);

        if (isset($validated['estado'])) $solicitud->estado = $validated['estado'];
        if (isset($validated['precio_cotizado'])) $solicitud->precio_cotizado = $validated['precio_cotizado'];
        if (isset($validated['comentario_admin'])) $solicitud->comentario_admin = $validated['comentario_admin'];

        $solicitud->save();

        return redirect()->back()->with('success', 'Solicitud actualizada correctamente.');
    }
}
