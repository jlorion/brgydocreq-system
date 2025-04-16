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
        Schema::create('barangay_officers', function (Blueprint $table) {
            $table->id('officer_id');
            $table->foreignId('address_id')->constrained('addresses', 'address_id')->onDelete('cascade');
            $table->foreignId('status_id')->constrained('statuses', 'status_id')->onDelete('cascade');
            $table->string('officer_firstname');
            $table->string('officer_middlename');
            $table->string('officer_lastname');
            $table->string('officer_suffix')->nullable();
            $table->date('officer_birthdate');
            $table->string('officer_gender');
            $table->string('officer_position');
            $table->string('officer_precinct');
            $table->string('officer_householdnum');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barangay__officers');
    }
};
