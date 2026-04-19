<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $clientIds = User::where('role', 'client')->pluck('id');
        $categoryIds = Category::all()->pluck('id');

        Project::factory()->count(12)->create([
            'client_id' => function () use ($clientIds) {
                return $clientIds->random();
            },
            'category_id' => function () use ($categoryIds) {
                return $categoryIds->random();
            },
        ]);
    }
}
