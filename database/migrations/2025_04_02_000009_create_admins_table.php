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
        Schema::create('admins', function (Blueprint $table) {
            $table->id('admin_id');
            $table->foreignId('officer_id')->unique()->constrained('barangay_officers', 'officer_id')->onDelete('cascade');
            $table->foreignId('role_id')->constrained('roles', 'role_id')->onDelete('cascade');
            $table->unsignedBigInteger('status_id')->default(3);
            $table->foreign('status_id')->references('status_id')->on('statuses')->onDelete('cascade');
            $table->string('admin_username')->unique();
            $table->string('email')->unique();
            $table->string('admin_phonenum');
            $table->string('admin_password');
            $table->string('admin_photopath')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
