<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos';

    protected $primaryKey = 'id_producto';

    const CREATED_AT = 'fecha_creacion';

    const UPDATED_AT = 'fecha_actualizacion';

    protected $fillable = [
        'id_categoria',
        'fabricante',
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'disponibilidad',
        'material',
        'tamano',
        'valoracion',
        'en_oferta',
        'es_nuevo',
        'ventas',
        'activo',
        'imagen_url',
        'tipo_producto',
        'fecha_inicio_preventa',
        'fecha_fin_preventa',
        'fecha_disponibilidad',
        'tipo_pago_preventa',
        'porcentaje_anticipo',
        'limite_preventa',
    ];

    protected $casts = [
        'fecha_inicio_preventa' => 'date',
        'fecha_fin_preventa' => 'date',
        'fecha_disponibilidad' => 'date',
        'porcentaje_anticipo' => 'decimal:2',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_categoria');
    }

    public function detallesPedido()
    {
        return $this->hasMany(DetallePedido::class, 'id_producto');
    }
}
