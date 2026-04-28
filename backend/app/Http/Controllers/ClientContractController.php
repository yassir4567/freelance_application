<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use Illuminate\Http\Request;

class ClientContractController extends Controller
{
    //
    public function index(Request $request)
    {
        $client = $request->user();
        $query = Contract::whereIn('status', ['active', 'completed'])
            ->whereHas('proposal.project', function ($q) use ($client) {
                $q->where('client_id', $client->id);
            })->with([
                    'proposal:id,project_id,freelancer_id',
                    'proposal.project:id,title',
                    'proposal.freelancer:id,user_id,title',
                    'proposal.freelancer.user:id,first_name,last_name,avatar',
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
                    'freelancer' => [
                        'id' => $contract->proposal->freelancer->id,
                        'first_name' => $contract->proposal->freelancer->user->first_name,
                        'last_name' => $contract->proposal->freelancer->user->last_name,
                        'avatar' => $contract->proposal->freelancer->user->avatar,
                    ],
                    'current_deliverable' => $current_deliverable,
                    'total_deliverables' => $total_deliverables,
                    'completed_deliverables' => $completed_deliverables,
                ];

            });


        return response()->json([
            'success' => true,
            'message' => 'Client Contract retrieved successfully',
            'data' => $contracts,
        ]);
    }

    public function stats(Request $request)
    {
        $client = $request->user();

        $stats = [];

        $active_contracts = Contract::where('status', 'active')
            ->whereHas('proposal.project', function ($q) use ($client) {
                $q->where('client_id', $client->id);
            })->count();

        $completed_contracts = Contract::where('status', 'completed')
            ->whereHas('proposal.project', function ($q) use ($client) {
                $q->where('client_id', $client->id);
            })->count();

        $total_spent = Payment::where('client_id', $client->id)->where('status', 'released')->sum('amount');
        $total_in_escrow = Payment::where('client_id', $client->id)->where('status', 'escrow')->sum('amount');

        $stats['active_contracts_count'] = $active_contracts;
        $stats['completed_contracts_count'] = $completed_contracts;
        $stats['total_spent'] = $total_spent;
        $stats['total_in_escrow'] = $total_in_escrow;

        return response()->json([
            'success' => true,
            'message' => 'Contract stats retrieved successfully',
            'data' => $stats,
        ]);

    }
}
