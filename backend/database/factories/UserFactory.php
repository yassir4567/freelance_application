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
            'username' => fake()->userName(),
            'email' => fake()->safeEmail(),
            'password' => Hash::make('password'),
            'role' => fake()->randomElement(['admin', 'client', 'freelancer']),
            'firstName' => fake()->firstName(),
            'lastName' => fake()->lastName(),
            'age' => fake()->numberBetween(18, 50),
            'phone' => fake()->phoneNumber(),
            'country' => fake()->country(),
            'avatar' => fake()->imageUrl(),
            'address' => fake()->address(),
            'city' => fake()->city()
        ];
    }
}
