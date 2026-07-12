<?php

namespace App\Http\Controllers;

use App\Models\SolicitudPersonalizada;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SolicitudController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'referencia_url' => 'nullable|url|max:255',
            'presupuesto' => 'nullable|numeric|min:0',
        ]);

        $solicitud = new SolicitudPersonalizada($validated);
        $solicitud->id_usuario = Auth::id();
        $solicitud->estado = 'En evaluación';
        $solicitud->fecha_creacion = now();
        $solicitud->save();

        return redirect()->back()->with('success', 'Solicitud creada con éxito.');
    }
}
