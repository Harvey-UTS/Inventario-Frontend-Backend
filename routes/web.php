<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;

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
Route::post('/logout', function () {
    Auth::logout(); // Cierra la sesión
    return redirect('/login'); // Redirige a la página de inicio de sesión
})->name('logout');