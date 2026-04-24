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
        $units = ['day', 'month', 'year'];

        $unit = fake()->randomElement($units);

        $number = match ($unit) {
            'day' => fake()->numberBetween(5, 30),
            'month' => fake()->numberBetween(1, 12),
            'year' => fake()->numberBetween(1, 3)
        };

        $unit_formatted = $number > 1 ? $unit . 's' : $unit;

        return [
            //
            'cover_letter' => fake()->paragraph(4, true),
            'status' => fake()->randomElement(['pending', 'accepted', 'rejected']),
            'delivery_time' => "$number $unit_formatted",
            'price' => fake()->randomFloat(2, 1, 500),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
