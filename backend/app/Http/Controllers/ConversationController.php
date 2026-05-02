<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();

        $role = $user->role;

        $query = Conversation::query()
            ->select('id', 'contract_id', 'created_at');

        $with = [
            'contract:id,proposal_id,status',
            'contract.proposal:id,project_id,freelancer_id',
            'contract.proposal.project:id,client_id,title',
        ];

        if ($role === 'client') {
            $with[] = 'contract.proposal.freelancer:id,user_id';
            $with[] = 'contract.proposal.freelancer.user:id,first_name,last_name,avatar,role';

            $query->whereHas('contract.proposal.project', function ($q) use ($user) {
                $q->where('client_id', $user->id);
            });
        } else if ($role === 'freelancer') {
            $with[] = 'contract.proposal.project.client:id,first_name,last_name,avatar,role';
            $query->whereHas('contract.proposal.freelancer', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        }

        $conversations = $query
            ->with($with)
            ->latest()
            ->get();

        $data = $conversations->map(function ($conversation) use ($role) {
            $contract = $conversation->contract;
            $proposal = $contract->proposal;
            $project = $proposal->project;

            $otherUser = null;

            if ($role === 'client') {
                $otherUser = $proposal->freelancer->user;
            } else if ($role === 'freelancer') {
                $otherUser = $project->client;
            }

            return [
                'id' => $conversation->id,
                'created_at' => $conversation->created_at,
                'contract_id' => $conversation->contract_id,
                'contract_status' => $contract->status,

                'project' => [
                    'id' => $project->id,
                    'title' => $project->title,
                ],

                'other_user' => [
                    'id' => $otherUser->id,
                    'first_name' => $otherUser->first_name,
                    'last_name' => $otherUser->last_name,
                    'avatar' => $otherUser->avatar,
                    'role' => $otherUser->role,
                ]
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Conversations retrieved successfully',
            'data' => $data
        ]);
    }
}
