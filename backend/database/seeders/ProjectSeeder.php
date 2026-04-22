<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Project;
use App\Models\Skill;
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
        $categoryIds = Category::pluck('id');
        $skillIds = Skill::pluck('id');

        Project::factory()->count(100)->create([
            'client_id' => function () use ($clientIds) {
                return $clientIds->random();
            },
            'category_id' => function () use ($categoryIds) {
                return $categoryIds->random();
            },
        ])->each(function ($project) use ($skillIds) {
            $count = rand(2, min(5, $skillIds->count()));
            $randomSkillsIds = $skillIds->random($count);
            $project->skills()->attach($randomSkillsIds);
        });
    }
}
