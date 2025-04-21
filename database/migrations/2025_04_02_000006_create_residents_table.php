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
            $table->unsignedBigInteger('status_id')->default(3);
            $table->foreign('status_id')->references('status_id')->on('statuses')->onDelete('cascade');
            $table->string('resident_firstname');
            $table->string('resident_middlename');
            $table->string('resident_lastname');
            $table->string('resident_suffix')->nullable();
            $table->date('resident_birthdate');
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
