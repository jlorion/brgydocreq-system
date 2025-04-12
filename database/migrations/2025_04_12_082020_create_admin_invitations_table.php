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
        Schema::create('admin_invitations', function (Blueprint $table) {
            $table->id('invite_id');
            $table->foreignId('officer_id')->constrained('barangay_officers', 'officer_id')->cascadeOnDelete();
            $table->foreignId('role_id')->constrained('roles', 'role_id')->cascadeOnDelete();
            $table->string('email')->unique();
            $table->string('phone_number')->index();
            $table->string('admin_username')->unique();
            $table->string('invite_token')->unique();
            $table->timestamp('expires_at');
            $table->boolean('used')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_invitations');
    }
};
