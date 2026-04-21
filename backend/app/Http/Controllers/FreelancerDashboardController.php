<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Freelancer;
use Illuminate\Http\Request;

class FreelancerDashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();
        $stats = [];

        if ($user->role !== 'freelancer') {
            return response()->json([
                'success' => false,
                'message' => 'unauthorized'
            ], 403);
        }
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


        $active_contracts = Contract::select('id', 'final_price', 'final_deadline', 'proposal_id')
            ->where('status', 'active')
            ->whereHas('proposal', function ($q) use ($freelancer) {
                $q->where('freelancer_id', $freelancer->id);
            })->with([
                'proposal:id,project_id,freelancer_id' ,
                'proposal.project:id,client_id,title',
                'proposal.project.client:id,first_name,last_name,avatar',
            ])->latest()->take(3)->get();


        return response()->json([
            'success' => true,
            'message' => 'Stats retrieved successfully',
            'data' => [
                'stats' => $stats,
                'active_contracts' => $active_contracts
            ]
        ]);
    }
}
