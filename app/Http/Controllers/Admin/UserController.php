<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('rol');
        $roles = \App\Models\Rol::all();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nombre', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        if ($request->filled('rol') && $request->rol !== 'Todos') {
            $rolName = $request->rol;
            $query->whereHas('rol', function($q) use ($rolName) {
                $q->where('nombre', $rolName);
            });
        }

        $usuarios = $query->orderBy('fecha_creacion', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('admin/usuarios', [
            'usuarios' => $usuarios,
            'roles' => $roles,
            'filters' => $request->only(['search', 'rol'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:8|confirmed',
            'activo' => 'boolean'
        ]);

        // Find Administrador role
        $adminRol = \App\Models\Rol::where('nombre', 'Administrador')->first();

        User::create([
            'id_rol' => $adminRol ? $adminRol->id_rol : 1, // Default to 1 if not found
            'nombre' => $validated['nombre'],
            'email' => $validated['email'],
            'password_hash' => bcrypt($validated['password']),
            'activo' => $request->has('activo') ? $request->activo : true,
            // telefono is nullable or we leave it empty
        ]);

        return redirect()->back()->with('success', 'Administrador creado exitosamente.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Opcional: Evitar que el usuario se elimine a sí mismo
        if (auth()->id() == $user->id_usuario) {
            return redirect()->back()->with('error', 'No puedes eliminar tu propia cuenta.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'Administrador eliminado correctamente.');
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:usuarios,email,' . $id . ',id_usuario',
            'id_rol' => 'sometimes|required|integer|exists:roles,id_rol',
            'activo' => 'boolean'
        ]);

        $updateData = [];
        if (isset($validated['nombre'])) $updateData['nombre'] = $validated['nombre'];
        if (isset($validated['email'])) $updateData['email'] = $validated['email'];
        if (isset($validated['id_rol'])) $updateData['id_rol'] = $validated['id_rol'];
        if ($request->has('activo')) $updateData['activo'] = $request->activo;

        $user->update($updateData);

        return redirect()->back()->with('success', 'Administrador actualizado correctamente.');
    }
}
