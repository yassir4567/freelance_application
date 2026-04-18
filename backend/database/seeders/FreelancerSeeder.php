<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Freelancer;
use App\Models\User;
use Illuminate\Database\Seeder;

class FreelancerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = User::where('role', 'freelancer')->get();
        $categoryIds = Category::all()->pluck('id');

        foreach ($users as $user) {
            if (! Freelancer::where('user_id', $user->id)->exists()) {
                Freelancer::factory()->create(['user_id' => $user->id, 'category_id' => $categoryIds->random()]);
            }
        }

        
    }
}
