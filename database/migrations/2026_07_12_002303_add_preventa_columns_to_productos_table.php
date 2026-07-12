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
        Schema::table('productos', function (Blueprint $table) {
            $table->date('fecha_inicio_preventa')->nullable()->after('tipo_producto');
            $table->date('fecha_fin_preventa')->nullable()->after('fecha_inicio_preventa');
            $table->date('fecha_disponibilidad')->nullable()->after('fecha_fin_preventa');
            $table->string('tipo_pago_preventa')->default('completo')->after('fecha_disponibilidad'); // completo, parcial, reserva
            $table->decimal('porcentaje_anticipo', 5, 2)->nullable()->after('tipo_pago_preventa');
            $table->integer('limite_preventa')->nullable()->after('porcentaje_anticipo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('productos', function (Blueprint $table) {
            $table->dropColumn([
                'fecha_inicio_preventa',
                'fecha_fin_preventa',
                'fecha_disponibilidad',
                'tipo_pago_preventa',
                'porcentaje_anticipo',
                'limite_preventa'
            ]);
        });
    }
};
