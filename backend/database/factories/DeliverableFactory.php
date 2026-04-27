<?php

namespace Database\Factories;

use App\Models\Deliverable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Deliverable>
 */
class DeliverableFactory extends Factory
{


    public function unlocked()
    {
        return $this->state(function () {
            $created_at = fake()->dateTimeBetween('-2 months', '-1 month');
            $unlocked_at = fake()->dateTimeBetween($created_at, '-3 weeks');
            return [
                'status' => 'unlocked',
                'deadline' => fake()->dateTimeBetween($created_at, '+1 month'),
                'created_at' => $created_at,
                'unlocked_at' => $unlocked_at,
            ];
        });
    }

    public function submitted()
    {
        return $this->state(function () {
            $created_at = fake()->dateTimeBetween('-2 months', '-1 month');
            $unlocked_at = fake()->dateTimeBetween($created_at, '-3 weeks');
            $submitted_at = fake()->dateTimeBetween($unlocked_at, 'now');
            return [
                'status' => 'submitted',
                'deadline' => fake()->dateTimeBetween($created_at, '+1 month'),
                'created_at' => $created_at,
                'unlocked_at' => $unlocked_at,
                'submitted_at' => $submitted_at,
                'deliverable_links' => [fake()->url(), fake()->url()],
                'submission_note' => fake()->sentence()
            ];
        });
    }

    public function accepted()
    {
        return $this->state(function () {
            $created_at = fake()->dateTimeBetween('-2 months', '-1 month');
            $unlocked_at = fake()->dateTimeBetween($created_at, '-3 weeks');
            $submitted_at = fake()->dateTimeBetween($unlocked_at, 'now');
            $accepted_at = fake()->dateTimeBetween($submitted_at, 'now');

            return [
                'status' => 'accepted',
                'deadline' => fake()->dateTimeBetween($created_at, '+1 month'),
                'created_at' => $created_at,
                'unlocked_at' => $unlocked_at,
                'submitted_at' => $submitted_at,
                'accepted_at' => $accepted_at,
                'deliverable_links' => [fake()->url(), fake()->url()],
                'submission_note' => fake()->sentence()
            ];
        });
    }
    public function revisionRequest()
    {
        return $this->state(function () {
            $created_at = fake()->dateTimeBetween('-2 months', '-1 month');
            $unlocked_at = fake()->dateTimeBetween($created_at, '-3 weeks');
            $submitted_at = fake()->dateTimeBetween($unlocked_at, 'now');
            return [
                'status' => 'revision_request',
                'deadline' => fake()->dateTimeBetween($created_at, '+1 month'),
                'created_at' => $created_at,
                'unlocked_at' => $unlocked_at,
                'submitted_at' => $submitted_at,
                'deliverable_links' => [fake()->url(), fake()->url()],
                'submission_note' => fake()->sentence()
            ];
        });
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $created_at = fake()->dateTimeBetween('-2 months', '-1 month');
        return [
            //
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'amount' =>  fake()->randomFloat(2, 1, 500),
            'deadline' => fake()->dateTimeBetween($created_at, "+ 1 months"),
            'status' => 'pending',
            'created_at' => $created_at,
            'unlocked_at' => null,
            'submitted_at' => null,
            'accepted_at' => null,
            'deliverable_links' => null,
            'submission_note' => null,

        ];
    }
}
