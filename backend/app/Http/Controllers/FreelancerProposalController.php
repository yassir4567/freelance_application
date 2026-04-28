<?php

namespace App\Http\Controllers;

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
}
