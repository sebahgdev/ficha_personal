<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ficha extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'fichas'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'nombres',
        'direccion',
        'telefono',
        'correo',
        'urgencia',
    ];

    protected $dates = ['deleted_at']; // Para habilitar soft deletes
}
