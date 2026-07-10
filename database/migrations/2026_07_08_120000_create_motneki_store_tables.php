<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 3. Categorias
        Schema::create('categorias', function (Blueprint $table) {
            $table->id('id_categoria');
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->boolean('activo')->default(true);
        });

        // 4. Productos
        Schema::create('productos', function (Blueprint $table) {
            $table->id('id_producto');
            $table->foreignId('id_categoria')->constrained('categorias', 'id_categoria')->cascadeOnDelete();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->decimal('precio', 10, 2);
            $table->integer('stock')->default(0);
            $table->string('disponibilidad')->default('stock'); // stock, preventa, bajo demanda
            $table->boolean('activo')->default(true);
            $table->timestamp('fecha_creacion')->nullable();
            $table->timestamp('fecha_actualizacion')->nullable();
        });

        // 5. Direcciones
        Schema::create('direcciones', function (Blueprint $table) {
            $table->id('id_direccion');
            $table->foreignId('id_usuario')->constrained('usuarios', 'id_usuario')->cascadeOnDelete();
            $table->string('direccion');
            $table->string('ciudad');
            $table->string('pais');
            $table->string('codigo_postal');
        });

        // 6. Pedidos
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id('id_pedido');
            $table->foreignId('id_usuario')->constrained('usuarios', 'id_usuario')->cascadeOnDelete();
            $table->foreignId('id_direccion')->constrained('direcciones', 'id_direccion')->cascadeOnDelete();
            $table->decimal('total', 10, 2);
            $table->string('estado')->default('pendiente'); // pendiente, pagado, enviado, entregado
            $table->string('codigo_seguimiento')->nullable();
            $table->timestamp('fecha_creacion')->nullable();
        });

        // 7. Detalle Pedido
        Schema::create('detalle_pedido', function (Blueprint $table) {
            $table->id('id_detalle');
            $table->foreignId('id_pedido')->constrained('pedidos', 'id_pedido')->cascadeOnDelete();
            $table->foreignId('id_producto')->constrained('productos', 'id_producto')->cascadeOnDelete();
            $table->integer('cantidad');
            $table->decimal('precio_unitario', 10, 2);
        });

        // 8. Pagos
        Schema::create('pagos', function (Blueprint $table) {
            $table->id('id_pago');
            $table->foreignId('id_pedido')->constrained('pedidos', 'id_pedido')->cascadeOnDelete();
            $table->string('metodo'); // tarjeta, transferencia, efectivo, etc.
            $table->string('estado')->default('pendiente'); // pendiente, pagado, fallido
            $table->decimal('monto', 10, 2);
            $table->timestamp('fecha_pago')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagos');
        Schema::dropIfExists('detalle_pedido');
        Schema::dropIfExists('pedidos');
        Schema::dropIfExists('direcciones');
        Schema::dropIfExists('productos');
        Schema::dropIfExists('categorias');
    }
};
