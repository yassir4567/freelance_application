<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'email' => fake()->safeEmail(),
            'password' => Hash::make('password'),
            'role' => fake()->randomElement(['admin', 'client', 'freelancer']),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'phone' => fake()->phoneNumber(),
            'country' => fake()->country(),
            'avatar' => fake()->imageUrl(),
            'address' => fake()->address(),
            'city' => fake()->city(),
        ];
    }
}
