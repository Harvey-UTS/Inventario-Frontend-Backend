<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ventas extends Model
{
    use HasFactory;
    protected $fillable = ['idProductos', 'idClientes', 'cantidad', 'soporte_de_compra', 'valor_unitario', 'precio_de_venta'];

    public function products()
    {
        return $this->belongsTo(Productos::class, 'idProductos');
    }

    public function Clientes()
    {
        return $this->belongsTo(Clientes::class, 'idClientes');
    }

    protected static function booted()
    {
        static::creating(function ($venta) {
            // Calcula el precio de compra antes de crear el registro
            $venta->precio_de_venta = $venta->cantidad * $venta->valor_unitario;
        });

        static::created(function ($venta) {
            // Encuentra el producto y actualiza el stock
            $product = Productos::find($venta->idProductos);
            if ($product) {
                $product->stock = $product->stock - $venta->cantidad;
                $product->save();
            }
        });
    }
}
