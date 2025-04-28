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
        Schema::create('document_archives', function (Blueprint $table) {
            $table->id('archived_id');
            $table->foreignId('status_id')->constrained('statuses', 'status_id')->cascadeOnDelete();
            $table->foreignId('admin_id')->constrained('admins', 'admin_id')->cascadeOnDelete();
            $table->foreignId('requested_document_id')->constrained('requested_documents', 'requested_document_id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document__archives');
    }
};
