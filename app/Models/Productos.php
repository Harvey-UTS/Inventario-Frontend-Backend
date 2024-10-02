<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    use HasFactory;
    protected $fillable = ['nombre','descripcion', 'precio_de_compra', 'stock','precio_de_venta'];

    protected $attributes = [
        'stock' => 0,
    ];


    public function Proveedores(){
        return $this->belongsToMany(Proveedores::class, 'compras');
    }

    public function Clientes(){
        return $this->belongsToMany(Clientes::class, 'ventas');
    }
}
