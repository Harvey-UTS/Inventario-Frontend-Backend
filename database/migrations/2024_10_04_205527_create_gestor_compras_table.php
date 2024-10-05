<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gestor_compras', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nombre del gestor
            $table->string('email')->unique(); // Correo electrónico
            $table->string('password'); // Contraseña
            $table->enum('estado', ['activo', 'inactivo'])->default('activo'); // Estado del gestor
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gestor_compras');
    }
};
