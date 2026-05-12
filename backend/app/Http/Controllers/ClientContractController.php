<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientContractController extends Controller
{
    //
    public function index(Request $request)
    {
        $client = $request->user();
        $query = Contract::whereIn('status', ['pending', 'active', 'completed'])
            ->whereHas('proposal.project', function ($q) use ($client) {
                $q->where('client_id', $client->id);
            })->with([
                    'proposal:id,project_id,freelancer_id',
                    'proposal.project:id,title',
                    'proposal.freelancer:id,user_id,title',
                    'proposal.freelancer.user:id,first_name,last_name,avatar',
                    'deliverables:id,contract_id,title,deadline,status,created_at',
                    'conversation:id,contract_id',
                ]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->wherehas('proposal.project', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        } else {
            $query->where('status', '!=', 'pending');
        }

        if ($request->filled('sort')) {
            $sort = $request->sort;
            if ($sort === 'newest') {
                $query->latest();
            } elseif ($sort === 'oldest') {
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
                    'revision_request',
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
                    'conversation' => $contract->conversation,
                ];

            });

        return response()->json([
            'success' => true,
            'message' => 'Client Contract retrieved successfully',
            'data' => $contracts,
        ]);
    }

    public function show(Request $request, string $id)
    {
        $client = $request->user();

        $contract = Contract::where('id', $id)
            ->whereHas('proposal.project', function ($q) use ($client) {
                $q->where('client_id', $client->id);
            })
            ->with([
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
                'proposal.project:id,title',
                'proposal.freelancer:id,user_id,title',
                'proposal.freelancer.user:id,first_name,last_name,avatar',
            ])->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Client contract detail retrieved successfully',
            'data' => [
                'id' => $contract->id,
                'fichier_pdf' => $contract->fichier_pdf,
                'fichier_pdf_url' => $contract->fichier_pdf
                    ? asset('storage/' . $contract->fichier_pdf)
                    : null,
                'description' => $contract->description,
                'status' => $contract->status,
                'final_price' => $contract->final_price,
                'final_deadline' => $contract->final_deadline,
                'created_at' => $contract->created_at,
                'deliverables' => $contract->deliverables,
                'project' => [
                    'id' => $contract->proposal->project->id,
                    'title' => $contract->proposal->project->title,
                ],
                'freelancer' => [
                    'id' => $contract->proposal->freelancer->id,
                    'user_id' => $contract->proposal->freelancer->user_id,
                    'title' => $contract->proposal->freelancer->title,
                    'first_name' => $contract->proposal->freelancer->user->first_name,
                    'last_name' => $contract->proposal->freelancer->user->last_name,
                    'avatar' => $contract->proposal->freelancer->user->avatar,
                ],
            ],
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

    public function setup(Request $request, string $id)
    {
        $client = $request->user();

        $contract = Contract::where('id', $id)
            ->where('status', 'pending')
            ->select('id', 'proposal_id', 'status')
            ->whereHas('proposal.project', function ($q) use ($client) {
                $q->where('client_id', $client->id);
            })->with([
                    'proposal:id,freelancer_id,project_id',
                    'proposal.project:id,client_id,category_id,title',
                    'proposal.freelancer:id,user_id,title',
                    'proposal.freelancer.user:id,first_name,last_name,avatar',
                ])->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Contract setup info retrieved successfully',
            'data' => $contract,
        ]);
    }

    public function activateContract(Request $request, string $id)
    {
        $client = $request->user();

        $contract = Contract::where('id', $id)->firstOrFail();

        $contract->load('proposal.project');

        if ($contract->proposal->project->client_id !== $client->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized action.',
            ], 403);
        }

        if ($contract->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending contracts can be confirmed.',
            ], 409);
        }

        $validated = $request->validate([
            'description' => 'required|string|min:100|max:2000',
            'final_price' => 'required|numeric|min:5',
            'final_deadline' => 'required|date|after:today',
            'deliverables' => 'required|string',
            'contract_pdf' => 'required|file|mimes:pdf|max:5120',
        ]);

        $deliverables = json_decode($validated['deliverables'], true);

        if (!is_array($deliverables)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid deliverables format',
            ], 422);
        }


        $updatedContract = DB::transaction(function () use ($request, $contract, $deliverables, $validated) {
            $project = $contract->proposal->project;

            $pdfPath = $request->file('contract_pdf')->store('contracts', 'public');

            $contract->update([
                'description' => $validated['description'],
                'final_price' => $validated['final_price'],
                'final_deadline' => $validated['final_deadline'],
                'status' => 'active',
                'fichier_pdf' => $pdfPath
            ]);

            $project->update([
                'status' => 'in_progress',
            ]);

            foreach ($deliverables as $deliverable) {
                $contract->deliverables()->create([
                    'title' => $deliverable['title'],
                    'description' => $deliverable['description'],
                    'amount' => $deliverable['amount'],
                    'status' => 'pending',
                    'created_at' => now(),
                    'position' => $deliverable['position'],
                ]);
            }

            $project->proposals()->where('id', '!=', $contract->proposal_id)
                ->whereIn('status', ['accepted', 'pending'])
                ->update(['status' => 'rejected']);

            return $contract->fresh([
                'proposal.freelancer:id,user_id',
                'proposal.freelancer.user:id,first_name,last_name,avatar',
                'proposal.project:id,title,status',
                'deliverables',
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Contract activated successfully',
            'data' => $updatedContract,
        ]);

    }
}
