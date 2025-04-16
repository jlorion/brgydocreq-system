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
        Schema::create('residents', function (Blueprint $table) {
            $table->id('resident_id');
            $table->foreignId('address_id')->constrained('addresses', 'address_id')->onDelete('cascade');
            $table->foreignId('status_id')->constrained('statuses', 'status_id')->onDelete('cascade');
            $table->string('resident_firstname');
            $table->string('resident_middlename');
            $table->string('resident_lastname');
            $table->string('resident_suffix')->nullable();
            $table->string('resident_birthdate');
            $table->string('resident_gender');
            $table->string('resident_precinct');
            $table->string('resident_householdnum');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
