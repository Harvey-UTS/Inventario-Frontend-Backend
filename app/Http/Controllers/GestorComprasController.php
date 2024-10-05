<?php

namespace App\Http\Controllers;

use App\Models\GestorCompras;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class GestorComprasController extends Controller
{
    protected $gestorComprasView;

    public function __construct()
    {
        $this->gestorComprasView = new GestorCompras();
    }

    // Obtener todos los gestores de compras
    public function index()
    {
        $gestores = $this->gestorComprasView->getGestores(); // Llamar a la función que obtenga solo gestores
        return response()->json($gestores, 200);
    }

    // Obtener un gestor de compras específico por ID
    public function show($id)
    {
        $gestor = $this->gestorComprasView->find($id); // Buscar por ID

        if (!$gestor) {
            return response()->json(['message' => 'Gestor de compras no encontrado'], 404);
        }

        return response()->json($gestor, 200);
    }

    // Crear un nuevo gestor de compras
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users', // Debe ser único
            'password' => 'required|string|min:8',
            'estado' => 'sometimes|in:activo,inactivo', // Estado opcional
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Crear el usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Encriptar la contraseña
        ]);

        // Asignar el rol "gestorCompras" al usuario creado
        $user->assignRole('gestorCompras');

        // Crear el gestor de compras
        $gestor = $this->gestorComprasView->create([ // Usar el modelo para crear el gestor
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Almacenar contraseña encriptada
            'estado' => $request->estado ?? 'activo', // Estado por defecto
        ]);

        return response()->json(['user' => $user, 'gestor' => $gestor], 201);
    }

    // Actualizar un gestor de compras
    public function update(Request $request, $id)
    {
        // Validar datos
        $gestor = $this->gestorComprasView->find($id);

        if (!$gestor) {
            return response()->json(['message' => 'Gestor de compras no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $gestor->id,
            'password' => 'sometimes|string|min:8',
            'estado' => 'sometimes|in:activo,inactivo',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Actualizar los campos permitidos
        $gestor->update([
            'name' => $request->name ?? $gestor->name,
            'email' => $request->email ?? $gestor->email,
            'password' => $request->password ? Hash::make($request->password) : $gestor->password,
            'estado' => $request->estado ?? $gestor->estado,
        ]);

        // Si es necesario, también puedes actualizar el usuario vinculado
        $user = User::where('email', $gestor->email)->first();
        if ($user) {
            $user->update([
                'name' => $gestor->name,
                'email' => $gestor->email,
                'password' => $gestor->password, // Si se actualizó
            ]);
        }

        return response()->json(['message' => 'Gestor actualizado'], 200);
    }

    // Eliminar gestor de compras
    public function destroy($id)
    {
        $gestor = $this->gestorComprasView->find($id);

        if (!$gestor) {
            return response()->json(['message' => 'Gestor de compras no encontrado'], 404);
        }

        // Eliminar el gestor de compras
        $gestor->delete();

        // Eliminar el usuario correspondiente si es necesario
        $user = User::where('email', $gestor->email)->first();
        if ($user) {
            $user->delete();
        }

        return response()->json(['message' => 'Gestor eliminado'], 200);
    }
}
