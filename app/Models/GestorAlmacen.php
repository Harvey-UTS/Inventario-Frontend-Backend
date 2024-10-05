<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;

class GestorAlmacen extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'users';

    protected $fillable = ['name', 'email', 'password', 'estado'];

    public function getGestores()
    {
        return DB::table('users')
            ->whereHas('roles', function ($query) {
                $query->where('name', 'gestorAlmacen');
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

    public function createGestor($data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'estado' => 'Activo',
        ]);

        $user->assignRole('gestorAlmacen');

        return $user;
    }
}
