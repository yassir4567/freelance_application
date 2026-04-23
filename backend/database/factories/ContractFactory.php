<?php

namespace Database\Factories;

use App\Models\Contract;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Contract>
 */
class ContractFactory extends Factory
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
            'fichier_pdf' => fake()->url(),
            'description' => fake()->paragraph(),
            'status' => 'pending',
            'final_price' => fake()->randomFloat(2, 1, 500),
            'final_deadline' => fake()->dateTimeBetween('-2 months', '+ 1 year'),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
