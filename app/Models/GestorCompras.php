<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles; // Importar el trait HasRoles
use App\Models\User; // Asegúrate de importar el modelo User

class GestorCompras extends Model
{
    use HasFactory, HasRoles; // Usar el trait HasRoles para el manejo de roles

    protected $table = 'users';

    // Agregar la propiedad fillable
    protected $fillable = ['name', 'email', 'password', 'estado']; // Asegúrate de incluir todos los campos necesarios

    public function getGestores()
    {
        return DB::table('users')
            ->whereHas('roles', function ($query) {
                $query->where('name', 'gestorCompras');
            })
            ->get();
    }

    public function updateGestor($id, $data)
    {
        return DB::table('users')
            ->where('id', $id)
            ->update($data);
    }

    public function deleteGestor($id)
    {
        return DB::table('users')
            ->where('id', $id)
            ->delete();
    }

    // Nueva función para crear un gestor
    public function createGestor($data)
    {
        // Crear un nuevo usuario
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']), // Asegúrate de hashear la contraseña
            'estado'=>'Activo',
        ]);

        // Asignar el rol 'gestorCompras' al nuevo usuario
        $user->assignRole('gestorCompras');

        return $user; // Retornar el usuario creado
    }
}
