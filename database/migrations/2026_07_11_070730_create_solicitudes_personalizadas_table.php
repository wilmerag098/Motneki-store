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
        Schema::dropIfExists('solicitudes_figuras');

        Schema::create('solicitudes_personalizadas', function (Blueprint $table) {
            $table->increments('id_solicitud');
            $table->integer('id_usuario')->nullable();
            $table->string('nombre', 150)->nullable();
            $table->text('descripcion')->nullable();
            $table->text('referencia_url')->nullable();
            $table->string('imagen', 255)->nullable();
            $table->decimal('presupuesto', 10, 2)->nullable();
            $table->decimal('precio_cotizado', 10, 2)->nullable();
            $table->string('estado', 50)->default('pendiente');
            $table->text('comentario_admin')->nullable();
            $table->timestamp('fecha_creacion')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes_personalizadas');
    }
};
