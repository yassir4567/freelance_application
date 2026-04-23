<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
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
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(5, true),
            'budget' => fake()->randomFloat(2, 10, 500),
            'status' => fake()->randomElement(['open', 'in review', 'in progress', 'completed', 'cancelled']),
            'experience_level' => fake()->randomElement(['junior', 'mid-level', 'senior']),
            'size' => fake()->randomElement(['small', 'medium', 'large']),
            'duration' => fake()->randomElement(['less_than_1_month', '1_to_3_month', '3_to_6_month', 'more_than_6_month']),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now')
        ];
    }
}
