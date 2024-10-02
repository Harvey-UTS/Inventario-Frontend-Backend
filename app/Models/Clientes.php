<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'telefono', 'email','cedula'];
    public function Product(){
        return $this->belongsToMany(Productos::class, 'ventas');
    }
}
