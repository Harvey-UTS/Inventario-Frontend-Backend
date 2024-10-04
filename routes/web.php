<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;
// use Spatie\Permission\Models\Role;

//$role = Role::create(['name'=>'AdministradorAlmacen']);
//  $role = Role::create(['name'=>'gestorAlmacen']);
//  $role = Role::create(['name'=>'AdministradorCompras']);
//  $role = Role::create(['name'=>'gestorCompras']);
//  $role = Role::create(['name'=>'AdministradorVentas']);
//  $role = Role::create(['name'=>'gestorVentas']);

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('login');
});

Route::get('/recepcionista', function () {
    return view('interfazrecepcionista');
});

Route::post('/register', [RegisterController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);
Route::get('/user/role', function () {
    $user = Auth::user();
    if ($user) {
        $role = $user->roles->pluck('name')->first(); // Obtener el rol
        return response()->json(['role' => $role], 200);
    }
    return response()->json(['error' => 'No autenticado'], 401);
});
Route::post('/logout', function () {
    Auth::logout(); // Cierra la sesión
    return redirect('/login'); // Redirige a la página de inicio de sesión
})->name('logout');
