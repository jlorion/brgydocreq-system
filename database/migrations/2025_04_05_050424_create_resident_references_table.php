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
        Schema::create('resident_references', function (Blueprint $table) {
            $table->id('reference_id');
            $table->foreignId('resident_id')->constrained('residents', 'resident_id')->cascadeOnDelete();
            $table->string('email')->index();
            $table->string('phone_number')->index();
            $table->string('reference_number');
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
        Schema::dropIfExists('resident_references');
    }
};
