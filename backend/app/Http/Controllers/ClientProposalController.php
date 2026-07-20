<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Conversation;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class ClientProposalController extends Controller
{
    //
    public function index(Request $request, string $id)
    {
        $project = Project::select('id', 'status', 'client_id')
            ->where('id', $id)
            ->firstOrFail();

        Gate::authorize('clientViewProposals', $project);

        $proposals = $project->proposals()->select(
            'id',
            'project_id',
            'freelancer_id',
            'cover_letter',
            'status',
            'price',
            'delivery_time',
            'created_at'
        )
            ->with([
                'freelancer:id,title,user_id',
                'freelancer.user:id,first_name,last_name,avatar',
                'contract:id,proposal_id',
                'contract.conversation:id,contract_id'
            ])->latest()->get();

        $processedProposals = $proposals->map(function ($proposal) {
            $data = [
                'id' => $proposal->id,
                'cover_letter' => $proposal->cover_letter,
                'status' => $proposal->status,
                'price' => (float) $proposal->price,
                'delivery_time' => $proposal->delivery_time,
                'created_at' => $proposal->created_at,
                'freelancer' => [
                    'id' => $proposal->freelancer->id,
                    'title' => $proposal->freelancer->title,
                    'user_id' => $proposal->freelancer->user_id,
                    'first_name' => $proposal->freelancer->user->first_name,
                    'last_name' => $proposal->freelancer->user->last_name,
                ],
            ];

            if ($proposal->contract && $proposal->contract->conversation) {
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
            'message' => 'Project proposals retrieved successfully',
            'data' => $processedProposals
        ]);
    }

    public function accept(Request $request, string $projectId, string $proposalId)
    {
        $client = $request->user();
        $project = $client->projects()->where('id', $projectId)->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        $proposal = $project->proposals()->where('id', $proposalId)->first();

        if (!$proposal) {
            return response()->json([
                'success' => false,
                'message' => 'Proposal not found'
            ], 404);
        }

        Gate::authorize('accept', $proposal);

        $result = DB::transaction(function () use ($project, $proposal) {
            $proposal->update([
                'status' => 'accepted'
            ]);

            $project->update([
                'status' => 'in_review'
            ]);

            $contract = Contract::create([
                'proposal_id' => $proposal->id,
                'status' => 'pending'
            ]);

            $conversation = Conversation::create([
                'contract_id' => $contract->id,
            ]);

            return $proposal->fresh()->load([
                'freelancer:id,title,user_id',
                'freelancer.user:id,first_name,last_name,avatar',
                'contract:id,proposal_id',
                'contract.conversation:id,contract_id,created_at'
            ]);
        });

        $processedProposal = [
            'id' => $result->id,
            'cover_letter' => $result->cover_letter,
            'status' => $result->status,
            'price' => (float) $result->price,
            'delivery_time' => $result->delivery_time,
            'created_at' => $result->created_at,
            'freelancer' => [
                'id' => $result->freelancer->id,
                'user_id' => $result->freelancer->user_id,
                'title' => $result->freelancer->title,
                'first_name' => $result->freelancer->user->first_name,
                'last_name' => $result->freelancer->user->last_name,
            ],
            'conversation' => [
                'id' => $result->contract->conversation->id,
                'contract_id' => $result->contract->id,
                'created_at' => $result->contract->conversation->created_at,
            ]
        ];

        return response()->json([
            'success' => true,
            'message' => 'Proposal accepted successfully',
            'data' => $processedProposal
        ]);
    }

    public function reject(Request $request, string $projectId, string $proposalId)
    {
        $client = $request->user();
        $project = $client->projects()->where('id', $projectId)->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        $proposal = $project->proposals()->where('id', $proposalId)->first();

        if (!$proposal) {
            return response()->json([
                'success' => false,
                'message' => 'Proposal not found'
            ], 404);
        }

        Gate::authorize('reject', $proposal);

        $proposal->update([
            'status' => 'rejected',
        ]);

        $processedProposal = [
            'id' => $proposal->id,
            'cover_letter' => $proposal->cover_letter,
            'status' => $proposal->status,
            'price' => (float) $proposal->price,
            'delivery_time' => $proposal->delivery_time,
            'created_at' => $proposal->created_at,
            'freelancer' => [
                'id' => $proposal->freelancer->id,
                'user_id' => $proposal->freelancer->user_id,
                'title' => $proposal->freelancer->title,
                'first_name' => $proposal->freelancer->user->first_name,
                'last_name' => $proposal->freelancer->user->last_name,
            ]
        ];

        return response()->json([
            'success' => true,
            'message' => 'Proposal rejected successfully',
            'data' => $processedProposal
        ], 200);
    }
}
