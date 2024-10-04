<?php

namespace App\Http\Controllers;

use App\Models\Proveedores;
use Illuminate\Http\Request;

class ProveedoresController extends Controller
{
    // Listar proveedores
    public function index()
    {
        return Proveedores::all();
    }

    // Crear proveedor
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'telefono' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'nit' => 'required|string|max:255',
        ]);

        $proveedor = Proveedores::create($request->all());
        return response()->json($proveedor, 201);
    }

    // Mostrar proveedor específico (opcional)4
    public function show($id)
    {
        return Proveedores::findOrFail($id);
    }

    // Actualizar proveedor
    public function update(Request $request, $id)
    {
        $proveedor = Proveedores::findOrFail($id);
        $proveedor->update($request->all());
        return response()->json($proveedor, 200);
    }

    // Eliminar proveedor
    public function destroy($id)
    {
        Proveedores::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
