<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        $subscriber = Subscriber::where('email', $request->email)->first();

        if ($subscriber) {
            if (!$subscriber->is_active) {
                $subscriber->update(['is_active' => true]);
                return back()->with('success', '¡Tu suscripción ha sido reactivada!');
            }
            return back()->with('info', 'Este correo ya está suscrito.');
        }

        Subscriber::create([
            'email' => $request->email,
            'is_active' => true,
        ]);

        return back()->with('success', '¡Gracias por suscribirte al Motneki Inner Circle!');
    }
}
