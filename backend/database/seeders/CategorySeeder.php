<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Web Development'],
            ['name' => 'Mobile Development'],
            ['name' => 'UI/UX Design'],
            ['name' => 'Digital Marketing'],
            ['name' => 'Writing & Translation'],
        ];

        $skillIds = Skill::pluck('id');

        foreach ($categories as $category) {
            Category::firstOrCreate($category)
                ->skills()
                ->attach($skillIds->random(rand(1, min(6, $skillIds->count()))));
        }
    }
}
