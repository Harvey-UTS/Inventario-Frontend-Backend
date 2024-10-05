<?php

namespace App\Http\Controllers;

use App\Models\GestorAlmacen;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class GestorAlmacenController extends Controller
{
    public function index()
    {
        // Devuelve todos los gestores de almacén
        return User::role('gestorAlmacen')->get();
    }

    public function store(Request $request)
    {
        // Valida los datos de entrada
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        // Crea el usuario y asigna el rol 'gestorAlmacen'
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'estado' => 'activo',
        ]);

        $user->assignRole('gestorAlmacen');

        return response()->json($user, 201);
    }

    public function show($id)
    {
        $user = User::role('gestorAlmacen')->findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::role('gestorAlmacen')->findOrFail($id);

        // Valida los datos
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,'.$id,
            'password' => 'string|min:8|nullable',
            'estado' => 'in:activo,inactivo',  // Asegurarse de validar el estado
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);

        return response()->json($user, 200);
    }


    public function destroy($id)
    {
        // Busca el usuario por ID
        $usuario = User::role('gestorAlmacen')->findOrFail($id);

        // Elimina el usuario
        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado con éxito'], 200);
    }
}
