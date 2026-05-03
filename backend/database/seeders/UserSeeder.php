<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        User::factory()->create([
            'first_name' => 'yassir',
            'last_name' => 'laaouisset',
            'email' => 'yassir@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => 'freelancer'
        ]);
        User::factory()->create([
            'first_name' => 'brahim',
            'last_name' => 'laaouisset',
            'email' => 'brahim@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => 'client'
        ]);

        User::factory()->create(['role' => 'admin']);

        User::factory()->count(7)->create(['role' => 'client']);

        User::factory()->count(7)->create(['role' => 'freelancer']);
    }
}
