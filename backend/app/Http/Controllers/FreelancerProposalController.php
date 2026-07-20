<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

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
                'project.category:id,name',
                'contract:id,proposal_id',
                'contract.conversation:id,contract_id,created_at'
            ]);

        $query->when($request->status, function ($q, $status) {
            $q->where('status', $status);
        });

        $proposals = $query->latest()->get();

        $processedProposals = $proposals->map(function ($proposal) {
            $data = [
                'id' => $proposal->id,
                'cover_letter' => $proposal->cover_letter,
                'status' => $proposal->status,
                'delivery_time' => $proposal->delivery_time,
                'price' => (float) $proposal->price,
                'created_at' => $proposal->created_at,
                'project' => [
                    'id' => $proposal->project->id,
                    'title' => $proposal->project->title,
                    'client' => [
                        'id' => $proposal->project->client_id,
                        'first_name' => $proposal->project->client->first_name,
                        'last_name' => $proposal->project->client->last_name,
                    ],
                    'category' => [
                        'id' => $proposal->project->category->id,
                        'name' => $proposal->project->category->name,
                    ]
                ]
            ];

            if ($proposal->contract()->exists()) {
                $data['conversation'] = [
                    'id' => $proposal->contract->conversation->id,
                    'contract_id' => $proposal->contract->id,
                    'created_at' => $proposal->contract->conversation->created_at,
                ];
            }


            return $data;
        });

        return response()->json([
            'success' => true,
            'message' => 'Proposals retrieved successfully',
            'data' => $processedProposals
        ], 200);
    }

    public function sendProposal(Request $request, string $projectId)
    {
        $project = Project::findOrFail($projectId);

        Gate::authorize('sendProposal', $project);

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
            ], 422);
        }

        $proposal = Proposal::create([
            'project_id' => $projectId,
            'freelancer_id' => $freelancer->id,
            'cover_letter' => $validated['cover_letter'],
            'delivery_time' => $validated['delivery_time'],
            'price' => $validated['price'],
            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Proposal sent successfully',
            'data' => $proposal
        ], 201);
    }
}
