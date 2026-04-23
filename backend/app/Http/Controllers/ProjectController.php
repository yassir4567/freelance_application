<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = Project::select(
            'id',
            'category_id',
            'title',
            'description',
            'budget',
            'status',
            'experience_level',
            'size',
            'duration',
            'created_at'
        )->with(['category:id,name', 'skills:id,name'])
            ->withCount('proposals')
            ->whereIn('status', ['open', 'in review']);

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('budget_min')) {
            $query->where('budget', '>=', $request->budget_min);
        }

        if ($request->filled('budget_max')) {
            $query->where('budget', '<', $request->budget_max);
        }

        if ($request->filled('experience')) {
            $query->where('experience_level', $request->experience);
        }

        if ($request->filled('size')) {
            $query->where('size', $request->size);
        }

        if ($request->filled('nbr_proposals_min')) {
            $query->has('proposals', '>=', $request->nbr_proposals_min);
        }

        if ($request->filled('nbr_proposals_max')) {
            $query->has('proposals', '<=', $request->nbr_proposals_max);
        }

        if ($request->filled('search')) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        if ($request->filled('sort')) {
            $sort = $request->sort;
            if ($sort == 'most_recent') {
                $query->latest();
            }
            if ($sort == 'best_match') {
                $user = $request->user();
                if ($user && $user->freelancer) {
                    $freelancerCategoryId = $user->freelancer->category_id;
                    $query->orderByRaw("category_id = ? DESC", [$freelancerCategoryId]);
                }
            }
        }

        $projects = $query->get();
        return response()->json([
            'success' => true,
            'message' => 'Projects retrieved successfully',
            'data' => $projects
        ]);
    }
}
