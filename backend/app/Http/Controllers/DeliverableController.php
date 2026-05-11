<?php

namespace App\Http\Controllers;

use App\Models\Deliverable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DeliverableController extends Controller
{
    //

    public function submit(Request $request, string $id)
    {
        $freelancer = $request->user()->freelancer;

        $deliverable = Deliverable::with('contract.proposal')
            ->where('id', $id)
            ->whereHas('contract.proposal', function ($q) use ($freelancer) {
                $q->where('freelancer_id', $freelancer->id);
            })
            ->firstOrFail();

        $validated = $request->validate([
            'submission_note' => 'required|min:3|max:500',
            'links' => 'required|array|min:1',
            'links.*' => 'required|url',
        ]);

        if (! in_array($deliverable->status, ['unlocked', 'revision_request'])) {
            return response()->json([
                'success' => false,
                'message' => 'Only unlocked deliverables or revision requests can be submitted',
            ], 409);
        }

        $deliverable->update([
            'submission_note' => $validated['submission_note'],
            'deliverable_links' => $validated['links'],
            'submitted_at' => now(),
            'status' => 'submitted',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Deliverable Accepted successfully',
            'data' => $deliverable->fresh(),
        ]);
    }

    public function accept(Request $request, string $id)
    {
        $client = $request->user();
        $deliverable = Deliverable::with([
            'contract.proposal.project',
            'payment',
        ])->findOrFail($id);

        if ($deliverable->contract->proposal->project->client_id !== $client->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized action',
            ], 403);
        }

        if ($deliverable->status !== 'submitted') {
            return response()->json([
                'success' => false,
                'message' => 'Only submitted deliverables can be accepted',
            ], 409);
        }

        if (! $deliverable->payment || $deliverable->payment->status !== 'escrow') {
            return response()->json([
                'success' => false,
                'message' => 'This deliverable must be funded before it can be accepted',
            ], 409);
        }

        $result = DB::transaction(function () use ($deliverable) {
            $deliverable->update([
                'status' => 'accepted',
                'accepted_at' => now(),
            ]);

            $deliverable->payment->update([
                'status' => 'released',
            ]);

            $contract = $deliverable->contract;

            $hasUnacceptedDeliverables = $contract->deliverables()
                ->where('status', '!=', 'accepted')
                ->exists();

            if (! $hasUnacceptedDeliverables) {
                $contract->update([
                    'status' => 'completed',
                ]);
            }

            return $deliverable->fresh([
                'payment',
                'contract',
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Deliverable accepted successfully',
            'data' => $result,
        ]);
    }

    public function requestRevision(Request $request, string $id)
    {
        $client = $request->user();
        $deliverable = Deliverable::with([
            'contract.proposal.project',
            'payment',
        ])->findOrFail($id);

        if ($deliverable->contract->proposal->project->client_id !== $client->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized action',
            ], 403);
        }

        if ($deliverable->status !== 'submitted') {
            return response()->json([
                'success' => false,
                'message' => 'Only submitted deliverables can be sent back for revision',
            ], 409);
        }

        if (! $deliverable->payment || $deliverable->payment->status !== 'escrow') {
            return response()->json([
                'success' => false,
                'message' => 'This deliverable must stay funded while a revision is requested',
            ], 409);
        }

        $deliverable->update([
            'status' => 'revision_request',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Revision requested successfully',
            'data' => $deliverable->fresh([
                'payment',
                'contract',
            ]),
        ]);
    }
}
