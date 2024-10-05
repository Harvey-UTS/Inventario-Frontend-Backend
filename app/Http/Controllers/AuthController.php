<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar las credenciales
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        // Intentar autenticar al usuario
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Iniciar sesión
            Session::put('user', $user);

            // Verificar el rol y redirigir a la interfaz correspondiente
            if ($user->hasRole('AdministradorAlmacen') && $user->estado === 'Activo') {
            $role = $user->roles->pluck('name')->first();
            return response()->json(['role' => $role, 'redirect' => '/recepcionista'], 200);
            } elseif ($user->hasRole('gestorAlmacen') && $user->estado === 'Activo') {
            $role = $user->roles->pluck('name')->first();
            return response()->json(['role' => $role, 'redirect' => '/recepcionista'], 200);
            } elseif($user->hasRole('AdministradorCompras') && $user->estado === 'Activo'){
            $role = $user->roles->pluck('name')->first();
            return response()->json(['role' => $role, 'redirect' => '/recepcionista'], 200);
            } elseif($user->hasRole('gestorCompras') && $user->estado === 'Activo'){
            $role = $user->roles->pluck('name')->first();
            return response()->json(['role' => $role, 'redirect' => '/recepcionista'], 200);
            } elseif($user->hasRole('AdministradorVentas') && $user->estado === 'Activo'){
            $role = $user->roles->pluck('name')->first();
            return response()->json(['role' => $role, 'redirect' => '/recepcionista'], 200);
            } elseif($user->hasRole('gestorVentas') && $user->estado === 'Activo'){
            $role = $user->roles->pluck('name')->first();
            return response()->json(['role' => $role, 'redirect' => '/recepcionista'], 200);
            } elseif( $user->estado !== 'Activo'){
                return response()->json(['message' => 'Su cuenta no está activa.'], 403);
            }
        } else {
            // Credenciales incorrectas
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }
    }

    public function logout()
    {
        Auth::logout();
        Session::flush(); // Eliminar todas las sesiones activas
        return redirect('/login');
    }
}
