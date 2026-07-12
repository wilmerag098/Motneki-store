<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    public function index(Request $request)
    {
        $query = Subscriber::query();
        
        if ($request->has('search') && $request->search != '') {
            $query->where('email', 'like', '%' . $request->search . '%');
        }

        $suscriptores = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('admin/suscripciones', [
            'suscriptores' => $suscriptores,
            'filters' => $request->only(['search'])
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'is_active' => ['required', 'boolean']
        ]);

        $subscriber = Subscriber::findOrFail($id);
        $subscriber->update([
            'is_active' => $request->is_active
        ]);

        return back()->with('success', 'Estado actualizado correctamente.');
    }

    public function destroy($id)
    {
        $subscriber = Subscriber::findOrFail($id);
        $subscriber->delete();

        return back()->with('success', 'Suscriptor eliminado.');
    }
}
