<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

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
                'freelancer.user:id,first_name,last_name,avatar'
            ])->latest()->get();
        return response()->json([
            'success' => true,
            'message' => 'Project proposals retrieved successfully',
            'data' => $proposals
        ]);
    }
}
