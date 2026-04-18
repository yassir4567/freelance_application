<?php

namespace Database\Factories;

use App\Models\Freelancer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Freelancer>
 */
class FreelancerFactory extends Factory
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
            'bio' => fake()->paragraph(),
            'portfolio_url' => fake()->url(),
            'resume_url' => fake()->url(),
        ];
    }
}
