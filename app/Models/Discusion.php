<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discusion extends Model
{
    protected $table = 'discusiones';

    protected $fillable = [
        'titulo',
        'cantidad_comentarios',
        'ultima_actividad',
    ];
}
