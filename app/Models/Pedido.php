<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'pedidos';

    protected $primaryKey = 'id_pedido';

    const CREATED_AT = 'fecha_creacion';

    const UPDATED_AT = null;

    public $timestamps = true;

    protected $fillable = [
        'id_usuario',
        'id_direccion',
        'total',
        'tipo_pedido',
        'estado',
        'codigo_seguimiento',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    public function direccion()
    {
        return $this->belongsTo(Direccion::class, 'id_direccion');
    }

    public function detalles()
    {
        return $this->hasMany(DetallePedido::class, 'id_pedido');
    }

    public function pago()
    {
        return $this->hasOne(Pago::class, 'id_pedido');
    }
}
