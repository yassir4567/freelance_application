<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Project;
use App\Models\Proposal;
use Illuminate\Http\Request;

class ClientDashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        $client = $request->user();
        if ($client->role !== 'client') {
            return response()->json([
                'success' => false,
                'message' => 'unauthorized'
            ], 403);
        }
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

        $recent_projects = Project::select('id', 'title', 'status', 'created_at')
            ->withCount('proposals')
            ->where('client_id', $client->id)
            ->take(3)
            ->get();


        return response()->json([
            'success' => true,
            'message' => 'Stats retrieved successfully',
            'data' => [
                'stats' => $stats,
                'recent_projects' => $recent_projects
            ]
        ]);
    }
}
