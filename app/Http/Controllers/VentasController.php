<?php

namespace App\Http\Controllers;

use App\Models\Ventas;
use Illuminate\Http\Request;

class VentasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Devuelve las ventas junto con los nombres de productos y clientes
        return Ventas::with(['products', 'clientes'])->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valida los datos de entrada
        $validatedData = $request->validate([
            'idProductos' => 'required|exists:productos,id',
            'idClientes' => 'required|exists:clientes,id',
            'cantidad' => 'required|integer|min:1',
            'valor_unitario' => 'required|numeric|min:0',
            'soporte_de_compra' => 'required|string|max:255',
        ]);

        // Crea la venta
        $venta = Ventas::create($validatedData);

        return response()->json($venta, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Devuelve una venta específica con los nombres de productos y clientes
        return Ventas::with(['products', 'clientes'])->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $venta = Ventas::findOrFail($id);

        // Valida los datos de entrada
        $validatedData = $request->validate([
            'idProductos' => 'exists:productos,id',
            'idClientes' => 'exists:clientes,id',
            'cantidad' => 'integer|min:1',
            'valor_unitario' => 'numeric|min:0',
            'soporte_de_compra' => 'string|max:255',
        ]);

        // Actualiza la venta
        $venta->update($validatedData);
        return response()->json($venta, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $venta = Ventas::findOrFail($id);
        $venta->delete();
        return response()->json(null, 204);
    }
}
