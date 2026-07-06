<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Models\Project;
use App\Models\Proposal;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ClientProjectController extends Controller
{
    //

    public function index(Request $request)
    {
        $client = $request->user();

        $query = Project::select('id', 'client_id', 'title', 'budget', 'status', 'created_at')
            ->where('client_id', $client->id)
            ->withCount('proposals');

        if ($request->filled('search')) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('sort')) {
            $sort = $request->sort;
            if ($sort === 'oldest') {
                $query->oldest();
            } else {
                $query->latest();
            }
        }

        $projects = $query->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Projects retrieved successfully',
            'data' => $projects
        ]);
    }

    public function show(Request $request, string $id)
    {
        $project = Project::select(
            'id',
            'client_id',
            'category_id',
            'title',
            'description',
            'budget',
            'status',
            'experience_level',
            'size',
            'duration',
            'created_at'
        )
            ->where('id', $id)
            ->withCount('proposals')
            ->with(['category:id,name', 'skills:id,name'])
            ->firstOrFail();

        Gate::authorize('viewClientProject', $project);



        $freelancer = null;
        if (in_array($project->status, ['completed', 'in_progress'])) {
            $acceptedProposal = Proposal::where('project_id', $project->id)
                ->where('status', 'accepted')
                ->with([
                    'freelancer:id,user_id,category_id,title',
                    'freelancer.user:id,first_name,last_name',
                    'freelancer.category:id,name',
                    'freelancer.skills:id,name'
                ])->first();
            $freelancer = $acceptedProposal?->freelancer;
        }

        $projectData = $project->toArray();
        $projectData['freelancer'] = $freelancer;

        return response()->json([
            'success' => true,
            'message' => 'Project retrieved successfully',
            'data' => $projectData
        ]);
    }
    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();
        $user = $request->user();

        $project = Project::create([
            'client_id' => $user->id,
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'budget' => $validated['budget'],
            'status' => 'open',
            'experience_level' => $validated['experience_level'],
            'size' => $validated['size'],
            'duration' => $validated['duration'],
        ]);

        $project->skills()->attach($validated['skills']);

        return response()->json([
            'success' => 'true',
            'message' => 'Project created successfully',
            'data' => $project->load(['skills:id,name', 'category:id,name'])
        ]);
    }
}
