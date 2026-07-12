<?php

namespace App\Http\Controllers;

use App\Models\Direccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DireccionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'codigo_postal' => 'required|string|max:20',
        ]);

        $user = Auth::user();

        $user->direcciones()->create($validated);

        return redirect()->back()->with('success', 'Dirección agregada exitosamente.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $direccion = Direccion::findOrFail($id);

        if ($direccion->id_usuario !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'codigo_postal' => 'required|string|max:20',
        ]);

        $direccion->update($validated);

        return redirect()->back()->with('success', 'Dirección actualizada exitosamente.');
    }
}
