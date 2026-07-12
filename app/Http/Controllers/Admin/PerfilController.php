<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class PerfilController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/perfil', [
            // Inertia ya envía la prop 'auth.user' globalmente, pero podemos pasar datos extra si fuera necesario.
        ]);
    }

    public function updateInfo(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuarios,email,' . $user->id_usuario . ',id_usuario',
        ]);

        $user->nombre = $validated['nombre'];
        $user->email = $validated['email'];
        $user->save();

        return redirect()->back()->with('success', 'Información de perfil actualizada exitosamente.');
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password_hash)) {
            throw ValidationException::withMessages([
                'current_password' => 'La contraseña actual no es correcta.',
            ]);
        }

        $user->password_hash = Hash::make($request->password);
        $user->save();

        return redirect()->back()->with('success', 'Contraseña actualizada de forma segura.');
    }
}
