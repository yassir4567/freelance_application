<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Conversation;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function PHPUnit\Framework\returnArgument;

class ClientProposalController extends Controller
{
    //
    public function index(Request $request, string $id)
    {
        $client = $request->user();
        $project = $client->projects()
            ->select('id', 'status')
            ->where('id', $id)
            ->firstOrFail();
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
        return response()->json([
            'success' => true,
            'message' => 'Project proposals retrieved successfully',
            'data' => $proposals
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

        if (!in_array($project->status, ['open', 'in_review'])) {
            return response()->json([
                'success' => false,
                'message' => 'This project is not accepting proposals.'
            ], 409);
        }

        if ($proposal->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending proposals can be accepted.'
            ], 409);
        }

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

        return response()->json([
            'success' => true,
            'message' => 'Proposal accepted successfully',
            'data' => $result
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

        if ($proposal->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending proposals can be rejected'
            ], 409);
        }

        $proposal->update([
            'status' => 'rejected',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Proposal rejected successfully',
            'data' => $proposal->fresh()->load([
                'freelancer:id,title,user_id',
                'freelancer.user:id,first_name,last_name,avatar',
                'contract:id,proposal_id',
                'contract.conversation:id,contract_id,created_at'
            ]),
        ], 200);
    }
}
