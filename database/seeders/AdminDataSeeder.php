<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class AdminDataSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Create 200 users
        for ($i = 0; $i < 10; $i++) {
            $name = $faker->name;
            $username = strtolower(str_replace(' ', '.', $name)) . $faker->numberBetween(1, 999);
            
            User::create([
                'username' => $username,
                'name' => $name,
                'email' => $faker->unique()->safeEmail,
                'phone_number' => $faker->boolean(70) ? $faker->phoneNumber : null,
                'status' => $faker->randomElement(['active', 'inactive', 'invited', 'suspended']),
                'role' => $faker->randomElement(['admin', 'manager', 'cashier', 'superadmin']),
                'email_verified_at' => $faker->boolean(80) ? now() : null,
                'password' => Hash::make('password'),
                'created_at' => $faker->dateTimeBetween('-2 years', 'now'),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('Created 200 users successfully!');
    }
}
