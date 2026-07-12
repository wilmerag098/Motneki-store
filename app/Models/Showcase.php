<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Showcase extends Model
{
    protected $fillable = [
        'usuario',
        'descripcion',
        'imagen_url',
        'es_principal',
    ];
}
