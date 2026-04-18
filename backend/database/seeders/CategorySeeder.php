<?php

namespace Database\Seeders;

use App\Models\Category;
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
        foreach ($categories as $category) {
            Category::firstOrCreate($category);
        }
    }
}
