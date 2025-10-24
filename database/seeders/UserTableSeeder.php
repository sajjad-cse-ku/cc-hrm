<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'username' => 'freeman.dicki',
                'name' => 'Freeman Dicki',
                'email' => 'freeman83@gmail.com',
                'phone_number' => '+16927756140',
                'status' => 'invited',
                'role' => 'cashier',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'username' => 'nick.bashirian-lowe',
                'name' => 'Nick Bashirian-Lowe',
                'email' => 'nick_donnelly@gmail.com',
                'phone_number' => '+17425632370',
                'status' => 'invited',
                'role' => 'admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'username' => 'ardith_jast',
                'name' => 'Ardith Jast',
                'email' => 'ardith_crist@gmail.com',
                'phone_number' => '+13553118532',
                'status' => 'suspended',
                'role' => 'cashier',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'username' => 'jeffrey_collins91',
                'name' => 'Jeffrey Collins',
                'email' => 'jeffrey.stark95@hotmail.com',
                'phone_number' => '+14646410541',
                'status' => 'inactive',
                'role' => 'manager',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'username' => 'ashton.auer',
                'name' => 'Ashton Auer',
                'email' => 'ashton_hegmann67@yahoo.com',
                'phone_number' => '+14345445030',
                'status' => 'suspended',
                'role' => 'superadmin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'username' => 'golda.gleason',
                'name' => 'Golda Gleason',
                'email' => 'golda.smith32@gmail.com',
                'phone_number' => '+14606427316',
                'status' => 'active',
                'role' => 'manager',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'username' => 'maurine.rutherford',
                'name' => 'Maurine Rutherford',
                'email' => 'maurine_bechtelar@gmail.com',
                'phone_number' => '+16544865144',
                'status' => 'suspended',
                'role' => 'manager',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'username' => 'alford.wehner',
                'name' => 'Alford Wehner',
                'email' => 'alford36@hotmail.com',
                'phone_number' => '+12134843128',
                'status' => 'active',
                'role' => 'manager',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'username' => 'theresa_rolfson46',
                'name' => 'Theresa Rolfson',
                'email' => 'theresa.mertz@yahoo.com',
                'phone_number' => '+17353031624',
                'status' => 'suspended',
                'role' => 'cashier',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'username' => 'buford.bradtke',
                'name' => 'Buford Bradtke',
                'email' => 'buford68@yahoo.com',
                'phone_number' => '+16751521120',
                'status' => 'suspended',
                'role' => 'cashier',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }
    }
}
