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
        $catLlaveros = Categoria::create(['nombre' => 'Llaveros', 'descripcion' => 'Llaveros de colección.', 'activo' => true]);
        $catFiguras = Categoria::create(['nombre' => 'Figuras', 'descripcion' => 'Figuras de acción y colección.', 'activo' => true]);
        $catPeluches = Categoria::create(['nombre' => 'Peluches', 'descripcion' => 'Peluches de tus animes favoritos.', 'activo' => true]);
        $catCollares = Categoria::create(['nombre' => 'Collares', 'descripcion' => 'Collares y accesorios.', 'activo' => true]);
        $catRelojes = Categoria::create(['nombre' => 'Relojes', 'descripcion' => 'Relojes temáticos.', 'activo' => true]);
        $catPolos = Categoria::create(['nombre' => 'Polos', 'descripcion' => 'Polos y ropa.', 'activo' => true]);

        // 4. Productos generados iterativamente (1 de stock, 1 preventa y 1 exclusivo por categoría)
        $categoriasList = [
            ['cat' => $catLlaveros, 'img' => '/images/Llavero01.webp', 'nombreBase' => 'Llavero'],
            ['cat' => $catFiguras, 'img' => '/images/Figura01.webp', 'nombreBase' => 'Figura'],
            ['cat' => $catPeluches, 'img' => '/images/Peluche01.webp', 'nombreBase' => 'Peluche'],
            ['cat' => $catCollares, 'img' => '/images/Collar01.webp', 'nombreBase' => 'Collar'],
            ['cat' => $catRelojes, 'img' => '/images/Reloj01.webp', 'nombreBase' => 'Reloj'],
            ['cat' => $catPolos, 'img' => '/images/Polo01.webp', 'nombreBase' => 'Polo'],
        ];

        $tipos = ['stock', 'preventa', 'exclusivo'];

        foreach ($categoriasList as $catItem) {
            foreach ($tipos as $tipo) {
                
                $data = [
                    'id_categoria' => $catItem['cat']->id_categoria,
                    'nombre' => $catItem['nombreBase'] . ' - Edición ' . ucfirst($tipo),
                    'descripcion' => 'Este es un producto de prueba del tipo ' . $tipo . ' para la categoría ' . $catItem['nombreBase'] . '.',
                    'precio' => rand(50, 500) + 0.99,
                    'stock' => $tipo === 'stock' ? rand(5, 20) : ($tipo === 'exclusivo' ? rand(1, 3) : 0),
                    'disponibilidad' => 'stock', // Ya no usamos "preventa" aquí, usamos tipo_producto
                    'tipo_producto' => $tipo,
                    'activo' => true,
                    'fabricante' => 'MOTNEKI',
                    'imagen_url' => $catItem['img'],
                ];

                if ($tipo === 'preventa') {
                    $data['fecha_inicio_preventa'] = now();
                    $data['fecha_fin_preventa'] = now()->addDays(rand(10, 30));
                    $data['fecha_disponibilidad'] = now()->addMonths(rand(2, 6));
                    $data['tipo_pago_preventa'] = ['completo', 'parcial'][rand(0, 1)];
                    $data['porcentaje_anticipo'] = $data['tipo_pago_preventa'] === 'parcial' ? 50.00 : null;
                    $data['limite_preventa'] = rand(0, 1) ? rand(20, 50) : null;
                }

                Producto::create($data);
            }
        }

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

        $primerProducto = Producto::first();

        DetallePedido::create([
            'id_pedido' => $pedido->id_pedido,
            'id_producto' => $primerProducto->id_producto,
            'cantidad' => 1,
            'precio_unitario' => $primerProducto->precio,
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
