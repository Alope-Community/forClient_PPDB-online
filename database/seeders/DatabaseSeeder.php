<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SchoolInfoSeeder::class,
            UserSeeder::class,
            UserDetailSeeder::class,
            RoleSeeder::class,
            RegistrationSeeder::class,
            DocumentSeeder::class,
            VerificationSeeder::class,
        ]);
    }
}
