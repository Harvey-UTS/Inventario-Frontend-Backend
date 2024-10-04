<?php

namespace App\Http\Controllers;

use App\Models\Compras;
use App\Models\Productos;
use App\Models\Proveedores;
use Illuminate\Http\Request;

class ComprasController extends Controller
{
    public function index()
    {
        // Devuelve todas las compras con productos y proveedores
        return Compras::with(['products', 'proveedores'])->get();
    }

    public function store(Request $request)
    {
        // Valida los datos de entrada
        $validatedData = $request->validate([
            'idProductos' => 'required|exists:productos,id',
            'idProveedores' => 'required|exists:proveedores,id',
            'cantidad' => 'required|integer|min:1',
            'valor_unitario' => 'required|numeric|min:0',
            'soporte_de_compra' => 'required|string|max:255',
        ]);

        // Crea la compra
        $compra = Compras::create($validatedData);

        return response()->json($compra, 201);
    }

    public function show(string $id)
    {
        return Compras::with(['products', 'proveedores'])->findOrFail($id);
    }

    public function update(Request $request, string $id)
    {
        $compra = Compras::findOrFail($id);

        $validatedData = $request->validate([
            'idProductos' => 'exists:productos,id',
            'idProveedores' => 'exists:proveedores,id',
            'cantidad' => 'integer|min:1',
            'valor_unitario' => 'numeric|min:0',
            'soporte_de_compra' => 'string|max:255',
        ]);

        $compra->update($validatedData);
        return response()->json($compra, 200);
    }

    public function destroy(string $id)
    {
        $compra = Compras::findOrFail($id);
        $compra->delete();
        return response()->json(null, 204);
    }
}
