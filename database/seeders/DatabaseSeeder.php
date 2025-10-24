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
        // User::factory(10)->create();
        $this->call([
            AdminDataSeeder::class,
            UserTableSeeder::class,
        ]);
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'username' => 'test.user',
                'name' => 'Test User',
                'password' => 'password',
                'phone_number' => '+1234567890',
                'status' => 'active',
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }
}
