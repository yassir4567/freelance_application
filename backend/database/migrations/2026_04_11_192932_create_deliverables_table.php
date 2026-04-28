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
        Schema::create('deliverables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contract_id')->constrained();
            $table->string('title');
            $table->text('description');
            $table->float('amount');
            $table->date('deadline')->nullable();
            $table->json('deliverable_links')->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
            $table->dateTime('unlocked_at')->nullable();
            $table->dateTime('submitted_at')->nullable();
            $table->dateTime('accepted_at')->nullable();
            $table->enum('status', [
                'pending',
                'unlocked',
                'submitted',
                'accepted',
                'revision_request',
                'cancelled',
            ]);
            $table->text('submission_note')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliverables');
    }
};
