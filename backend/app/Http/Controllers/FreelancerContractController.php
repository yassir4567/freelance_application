<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use Illuminate\Http\Request;

class FreelancerContractController extends Controller
{

    public function index(Request $request)
    {
        $freelancer = $request->user()->freelancer;

        $query = Contract::whereIn('status', ['active', 'completed'])
            ->whereHas('proposal', function ($q) use ($freelancer) {
                $q->where('freelancer_id', $freelancer->id);
            })->with([
                    'proposal:id,project_id',
                    'proposal.project:id,title,client_id',
                    'proposal.project.client:id,first_name,last_name,avatar',
                    'deliverables:id,contract_id,title,deadline,status,created_at'
                ]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->wherehas('proposal.project', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }


        if ($request->filled('sort')) {
            $sort = $request->sort;
            if ($sort === 'newest') {
                $query->latest();
            } else if ($sort === 'oldest') {
                $query->oldest();
            }
        }

        $contracts = $query->get()
            ->map(function ($contract) {
                $total_deliverables = $contract->deliverables->count();
                $completed_deliverables = $contract->deliverables->where('status', 'accepted')->count();
                $current_deliverable = $contract->deliverables->whereIn('status', [
                    'unlocked',
                    'submitted',
                    'revision_request'
                ])->first();

                return [
                    'id' => $contract->id,
                    'status' => $contract->status,
                    'final_price' => $contract->final_price,
                    'project_title' => $contract->proposal->project->title,
                    'client' => [
                        'id' => $contract->proposal->project->client_id,
                        'first_name' => $contract->proposal->project->client->first_name,
                        'last_name' => $contract->proposal->project->client->last_name,
                        'avatar' => $contract->proposal->project->client->avatar,
                    ],
                    'current_deliverable' => $current_deliverable,
                    'total_deliverables' => $total_deliverables,
                    'completed_deliverables' => $completed_deliverables,
                ];
            });

        return response()->json([
            'success' => true,
            'message' => 'Freelancer Contract retrieved successfully',
            'data' => $contracts,
        ]);
    }

    public function show(Request $request, string $id)
    {
        $freelancer = $request->user()->freelancer;

        $contract = Contract::where('id', $id)
            ->whereHas('proposal', function ($q) use ($freelancer) {
                $q->where('freelancer_id', $freelancer->id);
            })->with([
                    'contractsTimelines:id,contract_id,event_type,title,description,created_at',
                    'deliverables' => function ($q) {
                        $q->select(
                            'id',
                            'contract_id',
                            'title',
                            'description',
                            'status',
                            'position',
                            'amount',
                            'deadline',
                            'deliverable_links',
                            'created_at',
                            'unlocked_at',
                            'submitted_at',
                            'accepted_at',
                            'submission_note',
                        )
                            ->with('payment')
                            ->orderBy('position', 'asc');
                    },
                    'proposal.project:id,client_id,title',
                    'proposal.project.client:id,first_name,last_name,avatar',
                ])->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Freelancer contract detail retrieved successfully',
            'data' => [
                'id' => $contract->id,
                'fichier_pdf' => $contract->fichier_pdf,
                'description' => $contract->description,
                'status' => $contract->status,
                'final_price' => $contract->final_price,
                'final_deadline' => $contract->final_deadline,
                'created_at' => $contract->created_at,
                'contract_timelines' => $contract->contractsTimelines,
                'deliverables' => $contract->deliverables,
                'project' => [
                    'id' => $contract->proposal->project->id,
                    'title' => $contract->proposal->project->title
                ],
                'client' => [
                    'id' => $contract->proposal->project->id,
                    'user_id' => $contract->proposal->project->client_id,
                    'title' => $contract->proposal->project->title,
                    'first_name' => $contract->proposal->project->client->first_name,
                    'last_name' => $contract->proposal->project->client->last_name,
                    'avatar' => $contract->proposal->project->client->avatar,
                ]
            ]
        ]);
    }

    public function stats(Request $request)
    {
        $freelancer = $request->user()->freelancer;

        $stats = [];

        $active_contracts = Contract::where('status', 'active')
            ->whereHas('proposal', function ($q) use ($freelancer) {
                $q->where('freelancer_id', $freelancer->id);
            })->count();

        $completed_contracts = Contract::where('status', 'completed')
            ->whereHas('proposal', function ($q) use ($freelancer) {
                $q->where('freelancer_id', $freelancer->id);
            })->count();

        $total_earnings = Payment::where('freelancer_id', $freelancer->id)->where('status', 'released')->sum('amount');


        $stats['active_contracts'] = $active_contracts;
        $stats['completed_contracts'] = $completed_contracts;
        $stats['total_earnings'] = $total_earnings;

        return response()->json([
            'success' => true,
            'message' => "Stats retrieved successfully",
            "data" => $stats
        ]);
    }
}
