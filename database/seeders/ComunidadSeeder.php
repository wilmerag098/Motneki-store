<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Evento;
use App\Models\Discusion;
use App\Models\Showcase;
use App\Models\Testimonio;
use Carbon\Carbon;

class ComunidadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Eventos
        Evento::create([
            'titulo' => 'Private Unveiling: The Katana Series',
            'fecha' => Carbon::now()->addDays(12),
            'ubicacion' => 'San Isidro, Lima - Hotel Westin',
            'tipo' => 'presencial'
        ]);
        Evento::create([
            'titulo' => 'Workshop: Preservación de Resina',
            'fecha' => Carbon::now()->addMonths(1)->addDays(5),
            'ubicacion' => 'Online Exclusive - Zoom Premium',
            'tipo' => 'online'
        ]);
        Evento::create([
            'titulo' => 'Gala de Coleccionistas: Fin de Año',
            'fecha' => Carbon::now()->addMonths(2)->addDays(20),
            'ubicacion' => 'Barranco, Lima - MAC Lima',
            'tipo' => 'presencial'
        ]);

        // 2. Discusiones
        Discusion::create([
            'titulo' => '¿Qué opinan del nuevo material de las bases?',
            'cantidad_comentarios' => 42,
            'ultima_actividad' => Carbon::now()->subMinutes(5)
        ]);
        Discusion::create([
            'titulo' => 'Especulación: Lanzamiento "Bloodmoon" 2026',
            'cantidad_comentarios' => 128,
            'ultima_actividad' => Carbon::now()->subHours(2)
        ]);
        Discusion::create([
            'titulo' => 'Guía para importación de piezas exclusivas',
            'cantidad_comentarios' => 15,
            'ultima_actividad' => Carbon::now()->subDays(1)
        ]);

        // 3. Showcases
        Showcase::create([
            'usuario' => '@SandroCollects',
            'descripcion' => 'Edición Limitada "Zenith" - Sala Principal',
            'imagen_url' => 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1200&auto=format&fit=crop',
            'es_principal' => true
        ]);
        Showcase::create([
            'usuario' => '@LimaFigures',
            'descripcion' => 'Vitrina de Colección 2025',
            'imagen_url' => 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=800&auto=format&fit=crop',
            'es_principal' => false
        ]);
        Showcase::create([
            'usuario' => '@AnimeToysPE',
            'descripcion' => 'Colección Shonen Jump',
            'imagen_url' => 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop',
            'es_principal' => false
        ]);
        Showcase::create([
            'usuario' => '@JuanPerez',
            'descripcion' => 'Unboxing Especial',
            'imagen_url' => 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop',
            'es_principal' => false
        ]);

        // 4. Testimonios
        Testimonio::create([
            'nombre_usuario' => 'Mauricio V.',
            'nivel' => 'COLECCIONISTA NIVEL ONYX',
            'comentario' => '"La atención al detalle en MotnekiStore Perú es incomparable. No solo compras una figura, te unes a un círculo de personas que aprecian el arte real."',
            'estrellas' => 5
        ]);
        Testimonio::create([
            'nombre_usuario' => 'Elena R.',
            'nivel' => 'FUNDADORA LIMA ART TOYS',
            'comentario' => '"El evento privado en Lima fue espectacular. Poder hablar con otros coleccionistas y ver las piezas en vivo cambió mi forma de coleccionar."',
            'estrellas' => 5
        ]);
        Testimonio::create([
            'nombre_usuario' => 'Carlos D.',
            'nivel' => 'COLECCIONISTA DESDE 2026',
            'comentario' => '"El soporte en Perú es de primer nivel. Tuve una duda con mi preventa y la resolvieron en minutos con un trato muy humano y profesional."',
            'estrellas' => 5
        ]);
    }
}
