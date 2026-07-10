<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
    protected $table = 'direcciones';

    protected $primaryKey = 'id_direccion';

    public $timestamps = false;

    protected $fillable = [
        'id_usuario',
        'direccion',
        'ciudad',
        'pais',
        'codigo_postal',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
}
