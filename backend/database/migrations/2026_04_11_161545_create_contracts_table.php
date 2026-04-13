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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained()->unique();
            $table->string("fichierPdf") ;
            $table->text('description') ;
            $table->enum('status' , ['pending' , 'active' , 'completed' , 'cancelled' , 'rejected']) ;
            $table->float('final_price') ;
            $table->date('final_deadline') ;
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
