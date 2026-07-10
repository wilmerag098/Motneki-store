<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\DetallePedido;
use App\Models\Direccion;
use App\Models\Pago;
use App\Models\Pedido;
use App\Models\Producto;
use App\Models\Rol;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Roles
        $rolAdmin = Rol::create(['nombre' => 'Administrador']);
        $rolCliente = Rol::create(['nombre' => 'Cliente']);

        // 2. Usuarios
        $admin = User::create([
            'nombre' => 'Administrador Motneki',
            'email' => 'admin@motneki.com',
            'password_hash' => Hash::make('password'),
            'telefono' => '123456789',
            'activo' => true,
            'id_rol' => $rolAdmin->id_rol,
        ]);

        $cliente = User::create([
            'nombre' => 'Juan Perez',
            'email' => 'cliente@motneki.com',
            'password_hash' => Hash::make('password'),
            'telefono' => '987654321',
            'activo' => true,
            'id_rol' => $rolCliente->id_rol,
        ]);

        // 3. Categorías
        $catFiguras = Categoria::create([
            'nombre' => 'Figuras de Acción',
            'descripcion' => 'Figuras a escala y coleccionables de tus animes favoritos.',
            'activo' => true,
        ]);

        $catMangas = Categoria::create([
            'nombre' => 'Mangas & Novelas',
            'descripcion' => 'Colecciones de manga en español e inglés.',
            'activo' => true,
        ]);

        $catRopa = Categoria::create([
            'nombre' => 'Ropa & Accesorios',
            'descripcion' => 'Chaqueta, sudaderas y accesorios bordados.',
            'activo' => true,
        ]);

        // 4. Productos
        $prodLuffy = Producto::create([
            'id_categoria' => $catFiguras->id_categoria,
            'nombre' => 'Figura PVC Monkey D. Luffy - Gear 5 (18cm)',
            'descripcion' => 'Increíble figura de Luffy Gear 5 liberando los tambores de la liberación. Pintura de alta calidad.',
            'precio' => 1200.00,
            'stock' => 12,
            'disponibilidad' => 'stock',
            'activo' => true,
        ]);

        $prodZoro = Producto::create([
            'id_categoria' => $catFiguras->id_categoria,
            'nombre' => 'Figura scale 1/7 Roronoa Zoro - Wano Country (Preventa)',
            'descripcion' => 'Estatua escala 1/7 de Roronoa Zoro usando su ataque de tres espadas. Lanzamiento en Diciembre de 2026.',
            'precio' => 2500.00,
            'stock' => 0,
            'disponibilidad' => 'preventa',
            'activo' => true,
        ]);

        $prodDemon = Producto::create([
            'id_categoria' => $catMangas->id_categoria,
            'nombre' => 'Demon Slayer Box Set - Vol. 1 al 23 Completo',
            'descripcion' => 'Caja coleccionable con todos los volúmenes del manga de Koyoharu Gotouge.',
            'precio' => 750.00,
            'stock' => 5,
            'disponibilidad' => 'stock',
            'activo' => true,
        ]);

        $prodKatana = Producto::create([
            'id_categoria' => $catFiguras->id_categoria,
            'nombre' => 'Réplica Katana de Kokushibo - Bajo Demanda (Proxy)',
            'descripcion' => 'Katana ornamental de acero inoxidable con el diseño del primer creciente demoníaco de Kokushibo. Producto importado bajo pedido.',
            'precio' => 1100.00,
            'stock' => 0,
            'disponibilidad' => 'bajo demanda',
            'activo' => true,
        ]);

        // 5. Dirección del cliente
        $direccion = Direccion::create([
            'id_usuario' => $cliente->id_usuario,
            'direccion' => 'Calle Falsa 123',
            'ciudad' => 'Bogotá',
            'pais' => 'Colombia',
            'codigo_postal' => '110111',
        ]);

        // 6. Pedido de prueba (Luffy - stock propio)
        $pedido = Pedido::create([
            'id_usuario' => $cliente->id_usuario,
            'id_direccion' => $direccion->id_direccion,
            'total' => 1200.00,
            'estado' => 'pagado',
            'codigo_seguimiento' => 'MTK-987654',
            'fecha_creacion' => now(),
        ]);

        DetallePedido::create([
            'id_pedido' => $pedido->id_pedido,
            'id_producto' => $prodLuffy->id_producto,
            'cantidad' => 1,
            'precio_unitario' => 1200.00,
        ]);

        Pago::create([
            'id_pedido' => $pedido->id_pedido,
            'metodo' => 'tarjeta',
            'estado' => 'pagado',
            'monto' => 1200.00,
            'fecha_pago' => now(),
        ]);
    }
}
