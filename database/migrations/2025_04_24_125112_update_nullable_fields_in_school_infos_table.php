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
        Schema::table('school_infos', function (Blueprint $table) {
            $table->string('key')->nullable()->change();
            $table->json('value')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('school_infos', function (Blueprint $table) {
            $table->string('key')->nullable(false)->change();
            $table->json('value')->nullable(false)->change();
        });
    }
};
