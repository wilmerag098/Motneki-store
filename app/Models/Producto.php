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
        'activo',
        'imagen_url',
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
