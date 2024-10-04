<?php

namespace App\Http\Controllers;

use App\Models\Clientes;
use Illuminate\Http\Request;

class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Clientes::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //a
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'telefono' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'cedula' => 'required|string|max:255',
        ]);

        $proveedor = Clientes::create($request->all());
        return response()->json($proveedor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Clientes::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $cliente = Clientes::findOrFail($id);
        $cliente->update($request->all());
        return response()->json($cliente, 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Clientes::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
