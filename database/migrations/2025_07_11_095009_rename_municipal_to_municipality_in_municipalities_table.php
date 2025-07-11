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
        Schema::table('municipalities', function (Blueprint $table) {
            // Rename 'municipal' column to 'municipality'
            $table->renameColumn('municipal', 'municipality');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('municipalities', function (Blueprint $table) {
            // Rename 'municipality' column back to 'municipal'
            $table->renameColumn('municipality', 'municipal');
        });
    }
};
