<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SolicitudPersonalizada;
use Illuminate\Support\Facades\Auth;

class SolicitudPersonalizadaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'nullable|string|max:150',
            'descripcion' => 'required|string',
            'referencia_url' => 'nullable|url',
            'presupuesto' => 'nullable|numeric|min:0',
            'imagen' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:10240',
        ]);

        $imagenPath = null;
        if ($request->hasFile('imagen')) {
            $imagenPath = $request->file('imagen')->store('solicitudes_personalizadas', 'public');
        }

        SolicitudPersonalizada::create([
            'id_usuario' => Auth::check() ? Auth::id() : null,
            'nombre' => $validated['nombre'] ?? null,
            'descripcion' => $validated['descripcion'],
            'referencia_url' => $validated['referencia_url'] ?? null,
            'presupuesto' => $validated['presupuesto'] ?? null,
            'imagen' => $imagenPath,
            'estado' => 'pendiente',
            'fecha_creacion' => now()
        ]);

        return redirect()->back()->with('success', 'Solicitud guardada correctamente.');
    }
}
