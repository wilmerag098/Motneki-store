<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudPersonalizada extends Model
{
    use HasFactory;

    protected $table = 'solicitudes_personalizadas';

    protected $primaryKey = 'id_solicitud';

    public $timestamps = false; // Manejamos fecha_creacion manualmente

    protected $fillable = [
        'id_usuario',
        'nombre',
        'descripcion',
        'referencia_url',
        'imagen',
        'presupuesto',
        'precio_cotizado',
        'estado',
        'comentario_admin',
        'fecha_creacion'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario', 'id_usuario');
    }
}
