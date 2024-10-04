<?php

namespace App\Http\Controllers;

use App\Models\Productos;
use Illuminate\Http\Request;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         return Productos::all();
    }

    /**
     * Show the form for creating a new resource.
     */
        public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:300',
            'precio_de_compra' => 'required|integer',
            'precio_de_venta' => 'required|integer',
        ]);

        $proveedor = Productos::create($request->all());
        return response()->json($proveedor, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Productos::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $producto = Productos::findOrFail($id);
        $producto->update($request->all());
        return response()->json($producto, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Productos::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
