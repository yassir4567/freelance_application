<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Freelancer;
use App\Models\Proposal;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function stats(Request $request)
    {
        $user = $request->user();
        $stats = [];
        if ($user->role === 'freelancer') {
            $freelancer = Freelancer::where('user_id', $user->id)->firstOrFail();
            $active_projects = Contract::where('status', 'active')
                ->whereHas('proposal', function ($query) use ($freelancer) {
                    $query->where('freelancer_id', $freelancer->id)
                        ->where('status', 'accepted');
                })->count();

            $accepted_proposals = $freelancer->proposals()->where('status', 'accepted')->count();

            $completed_contracts = Contract::where('status', 'completed')
                ->whereHas('proposal', function ($query) use ($freelancer) {
                    $query->where('freelancer_id', $freelancer->id);
                })->count();

            $stats['active_projects'] = $active_projects;
            $stats['accepted_proposals'] = $accepted_proposals;
            $stats['completed_contracts'] = $completed_contracts;
        }

        if ($user->role === 'client') {
            $client = $user;

            $total_projects = $client->projects()->count();

            $received_proposals = Proposal::whereHas('project', function ($q) use ($client) {
                $q->where('client_id', $client->id);
            })->count();

            $freelancer_hired = Contract::join('proposals', 'contracts.proposal_id', '=', 'proposals.id')
                ->join('projects', 'proposals.project_id', '=', 'projects.id')
                ->whereIn('contracts.status', ['active', 'completed', 'cancelled'])
                ->where('projects.client_id', $client->id)
                ->distinct('proposals.freelancer_id')
                ->count('proposals.freelancer_id');

            $ongoing_contracts = Contract::where('status', 'active')
                ->whereHas('proposal.project', function ($q) use ($client) {
                    $q->where('client_id', $client->id);
                })->count();

            $stats['total_projects'] = $total_projects;
            $stats['received_proposals'] = $received_proposals;
            $stats['freelancer_hired'] = $freelancer_hired;
            $stats['ongoing_contracts'] = $ongoing_contracts;
        }

        return response()->json([
            'success' => true,
            'message' => "Stats retrieved successfully",
            'data' => $stats
        ], 200);
    }
}
