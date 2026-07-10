<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // First, temporarily disable foreign key checks to avoid errors if products are linked
        // DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Let's just create the categories if they don't exist, or update them.
        $categorias = ['Llaveros', 'Figuras', 'Peluches', 'Collares', 'Relojes', 'Polos'];
        
        foreach ($categorias as $nombre) {
            Categoria::firstOrCreate(['nombre' => $nombre], ['activo' => true]);
        }
        
        // DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
