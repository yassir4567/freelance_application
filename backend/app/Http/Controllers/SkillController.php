<?php

namespace App\Http\Controllers;

use App\Models\Skill;

class SkillController extends Controller
{
    //
    public function index()
    {
        $skills = Skill::select('id', 'name')->with('categories:id,name')->get();

        return response()->json([
            'success' => true,
            'message' => 'Skills retrieved successfully',
            'data' => $skills
        ], 200);
    }
}
