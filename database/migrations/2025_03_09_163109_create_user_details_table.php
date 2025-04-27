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
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            // 
            $table->enum('gender', ['male', 'female'])->default('male');
            $table->string('birth_place')->nullable();
            $table->datetime('birth_date')->nullable();
            $table->enum('religion', ['islam', 'kristen', 'katolik', 'hindu', 'budha', 'konghucu'])->default('islam');
            $table->string('citizenship')->nullable();
            $table->string('family_order')->nullable();
            $table->string('number_of_siblings')->nullable();
            $table->string('family_status')->nullable();
            $table->enum('school_origin_type', ['SD', 'MI']);
            $table->string('graduation_year')->nullable();
            $table->string('extracurricular')->nullable();
            // 
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('phone_number')->nullable();
            $table->enum('father_job', ['pegawai', 'wiraswasta', 'pedagang', 'lainnya', 'tidak bekerja'])->default('tidak bekerja');
            $table->enum('mother_job', ['IRT', 'pedagang', 'pegawai', 'lainnya'])->default('IRT');
            $table->decimal('parent_salary', 10, 2)->nullable();
            $table->string('school_origin')->nullable();
            $table->decimal('school_expense', 10, 2)->nullable();
            $table->decimal('distance', 10, 2)->nullable();
            $table->text('address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_details');
    }
};
