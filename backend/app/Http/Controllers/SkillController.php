<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    //
    public function index()
    {
        $skills = Skill::select('id', 'name')->with('categories:id,name')->get();

        $processedSkills = $skills->map(function($skill) {
            return [
                'id' => $skill->id ,
                'name' => $skill->name ,
                'categories' => $skill->categories->map->only(['id', 'name'])
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Skills retrieved successfully',
            'data' => $processedSkills
        ], 200);
    }

    public function adminIndex()
    {
        $categories = Category::select('id', 'name')
            ->with(['skills:id,name'])
            ->withCount('skills')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Category skills retrieved successfully',
            'data' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'skills' => 'required|array|min:1',
            'skills.*' => 'required|string|min:2|max:100|distinct',
        ]);

        $category = Category::findOrFail($validated['category_id']);
        $skillIds = [];

        foreach ($validated['skills'] as $skillName) {
            $skill = Skill::firstOrCreate([
                'name' => trim($skillName),
            ]);

            $skillIds[] = $skill->id;
        }

        $category->skills()->syncWithoutDetaching($skillIds);

        return response()->json([
            'success' => true,
            'message' => 'Skills added successfully',
            'data' => $category->load(['skills:id,name'])->loadCount('skills'),
        ], 201);
    }
}
