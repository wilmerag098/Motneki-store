<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConfiguracionController extends Controller
{
    public function index()
    {
        // En una app real, esto vendría de una tabla 'settings' o 'configuraciones'
        $configuracion = [
            'nombre_tienda' => 'Motneki Store',
            'correo_contacto' => 'soporte@motneki.com',
            'telefono_contacto' => '+51 987 654 321',
            'direccion_fisica' => 'Av. Coleccionistas 123, Lima',
            
            'costo_envio_estandar' => 15.00,
            'costo_envio_express' => 25.00,
            'umbral_envio_gratis' => 300.00,

            'instagram_url' => 'https://instagram.com/motneki',
            'tiktok_url' => 'https://tiktok.com/@motneki',
            'facebook_url' => 'https://facebook.com/motnekistore',
            'twitter_url' => '',

            'modo_mantenimiento' => false,
            'moneda_base' => 'PEN',
            'mensaje_anuncio' => '¡Preventa de Figuras Anime con 20% de descuento!',
        ];

        return Inertia::render('admin/configuracion', [
            'configuracion' => $configuracion
        ]);
    }

    public function update(Request $request)
    {
        // Validación básica
        $validated = $request->validate([
            'nombre_tienda' => 'required|string|max:255',
            'correo_contacto' => 'required|email|max:255',
            'costo_envio_estandar' => 'required|numeric|min:0',
        ]);

        // Aquí se guardarían los datos en la base de datos (e.g. Settings::updateOrCreate(...))
        // Simulamos un retraso para que el loader en el frontend se vea
        sleep(1); 

        return redirect()->back()->with('success', 'Configuración guardada exitosamente.');
    }
}
