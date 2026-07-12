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
            $table->string('material')->nullable();
            $table->string('tamano')->nullable();
            $table->decimal('valoracion', 3, 2)->default(0);
            $table->boolean('en_oferta')->default(false);
            $table->boolean('es_nuevo')->default(true);
            $table->integer('ventas')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('productos', function (Blueprint $table) {
            $table->dropColumn(['material', 'tamano', 'valoracion', 'en_oferta', 'es_nuevo', 'ventas']);
        });
    }
};
