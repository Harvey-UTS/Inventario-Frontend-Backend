<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compras extends Model
{
    use HasFactory;
    protected $fillable = ['idProductos', 'idProveedores', 'cantidad', 'soporte_de_compra', 'valor_unitario', 'precio_de_compra'];

    public function products()
    {
        return $this->belongsTo(Productos::class, 'idProductos');
    }

    public function proveedores()
    {
        return $this->belongsTo(Proveedores::class, 'idProveedores');
    }

    protected static function booted()
    {
        static::creating(function ($compra) {
            // Calcula el precio de compra antes de crear el registro
            $compra->precio_de_compra = $compra->cantidad * $compra->valor_unitario;
        });

        static::created(function ($compra) {
            // Encuentra el producto y actualiza el stock
            $product = Productos::find($compra->idProductos);
            if ($product) {
                $product->stock += $compra->cantidad;
                $product->save();
            }
        });

        static::updating(function ($compra) {
            // Actualiza el precio de compra
            $compra->precio_de_compra = $compra->cantidad * $compra->valor_unitario;

            // Encuentra el producto para actualizar el stock
            $product = Productos::find($compra->idProductos);
            if ($product) {
                // Si la cantidad ha cambiado, actualiza el stock
                // Primero resta la cantidad anterior
                $originalCompra = static::find($compra->id);
                if ($originalCompra) {
                    $product->stock -= $originalCompra->cantidad;
                }

                // Luego suma la nueva cantidad
                $product->stock += $compra->cantidad;
                $product->save();
            }
        });
    }
}
