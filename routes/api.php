<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VentasController;
use App\Http\Controllers\ComprasController;
use App\Http\Controllers\ClientesController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\ProveedoresController;
use App\Http\Controllers\GestorComprasController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('proveedores', ProveedoresController::class);

Route::apiResource('productos', ProductosController::class);

Route::apiResource('clientes', ClientesController::class);

Route::apiResource('compras', ComprasController::class);

Route::apiResource('ventas', VentasController::class);

Route::get('/gestores', [GestorComprasController::class, 'index']);
Route::post('/gestores', [GestorComprasController::class, 'store']);
Route::get('/gestores/{id}', [GestorComprasController::class, 'show']);
Route::put('/gestores/{id}', [GestorComprasController::class, 'update']);
Route::delete('/gestores/{id}', [GestorComprasController::class, 'destroy']);
