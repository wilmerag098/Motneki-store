<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Evento;
use App\Models\Discusion;
use App\Models\Showcase;
use App\Models\Testimonio;

class ComunidadController extends Controller
{
    public function index()
    {
        $eventos = Evento::orderBy('fecha', 'asc')->get();
        $discusiones = Discusion::orderBy('ultima_actividad', 'desc')->take(3)->get();
        $showcases = Showcase::orderBy('es_principal', 'desc')->take(4)->get();
        $testimonios = Testimonio::orderBy('created_at', 'desc')->take(3)->get();

        return Inertia::render('comunidad', [
            'eventos' => $eventos,
            'discusiones' => $discusiones,
            'showcases' => $showcases,
            'testimonios' => $testimonios
        ]);
    }
}
