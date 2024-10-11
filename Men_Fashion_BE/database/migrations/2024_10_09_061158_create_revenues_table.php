<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('revenues', function (Blueprint $table) {
            $table->id();

            $table->string('total');

            $table->string('date')->default(\Carbon\Carbon::now()->day);
            $table->string('month')->default(\Carbon\Carbon::now()->month);
            $table->string('year')->default(\Carbon\Carbon::now()->year);

            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->references(/**/ 'id')->on('orders')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revenues');
    }
};
