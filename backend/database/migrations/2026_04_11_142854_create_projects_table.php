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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('users');
            $table->foreignId('category_id')->constrained();
            $table->string('title');
            $table->text('description');
            $table->decimal('budget', 10, 2);
            $table->enum('status', ['open', 'in review', 'in progress', 'completed', 'cancelled']);
            $table->enum('experience_level', ['junior', 'mid-level', 'senior']);
            $table->enum('size', ['small', 'medium', 'large']);
            $table->enum('duration', ['less_than_1_month', '1_to_3_month', '3_to_6_month', 'more_than_6_month']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
