<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Proposal;
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

        $projects = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Projects retrieved successfully',
            'data' => $projects
        ]);
    }

    public function show(Request $request, string $id)
    {
        $client = $request->user();

        $project = $client->projects()
            ->select(
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


    public function store(Request $request)
    {
        $allowed_duration = ['less_than_1_month', '1_to_3_month', '3_to_6_month', 'more_than_6_month'];
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|min:3|max:255',
            'description' => 'required|string|min:20|max:1500',
            'budget' => 'required|numeric|gt:5|max:100000',
            'experience_level' => 'required|string|in:junior,mid-level,senior',
            'size' => 'required|string|in:small,medium,large',
            'duration' => ['required', 'string', Rule::in($allowed_duration)],
            'skills' => 'required|array|min:1',
            'skills.*' => Rule::exists('category_skill', 'skill_id')->where('category_id', $request->category_id),
        ]);

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
            'project' => $project->load(['skills:id,name', 'category:id,name'])
        ]);
    }
}
