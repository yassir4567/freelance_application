<?php

namespace Database\Factories;

use App\Models\Proposal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Proposal>
 */
class ProposalFactory extends Factory
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
            'cover_letter' => fake()->paragraph(4, true),
            'status' => fake()->randomElement(['pending', 'accepted', 'rejected']),
            'deadline' => fake()->dateTimeBetween('-4 months', 'now'),
            'price' => fake()->randomFloat(2, 1, 1000),
        ];
    }
}
