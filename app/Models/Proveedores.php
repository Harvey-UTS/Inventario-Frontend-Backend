<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proveedores extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'telefono', 'email','nit'];
    public function Product(){
        return $this->belongsToMany(Productos::class, 'compras');
    }
}
