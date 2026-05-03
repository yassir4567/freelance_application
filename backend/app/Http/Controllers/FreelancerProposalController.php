<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Proposal;
use Illuminate\Http\Request;

class FreelancerProposalController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();

        $freelancer = $user->freelancer;

        $query = Proposal::where('freelancer_id', $freelancer->id)
            ->with([
                'project:id,client_id,category_id,title',
                'project.client:id,first_name,last_name',
                'project.category:id,name'
            ]);

        $query->when($request->status, function ($q, $status) {
            $q->where('status', $status);
        });

        $proposals = $query->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Proposals retrieved successfully',
            'data' => $proposals
        ], 200);
    }

    public function send(Request $request, string $projectId)
    {
        $project = Project::findOrFail($projectId);

        if (!in_array($project->status, ['open', 'in_review'])) {
            return response()->json([
                'success' => false,
                'message' => 'This project is not accepting proposals',
            ], 422);
        }

        $freelancer = $request->user()->freelancer;

        $validated = $request->validate([
            'cover_letter' => 'required|string|min:30|max:2000',
            'delivery_time' => 'required|string',
            'price' => 'required|numeric|gt:5|max:100000',
        ]);

        $alreadySent = Proposal::where('project_id', $projectId)
            ->where('freelancer_id', $freelancer->id)->exists();

        if ($alreadySent) {
            return response()->json([
                'success' => false,
                'message' => 'You already sent a proposal to this project'
            ]);
        }

        $proposal = Proposal::create([
            'project_id' => $projectId,
            'freelancer_id' => $freelancer->id,
            'cover_letter' => $validated['cover_letter'],
            'delivery_time' => $validated['delivery_time'],
            'price' => $validated['price'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Proposal sent successfully',
            'data' => $proposal
        ], 201);
    }
}
