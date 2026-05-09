<?php

namespace App\Http\Controllers;

use App\Models\Deliverable;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function PHPUnit\Framework\returnArgument;

class DeliverablePaymentController extends Controller
{
    //

    public function fund(Request $request, string $deliverableId)
    {

        $deliverable = Deliverable::findOrFail($deliverableId);
        $client = $request->user();

        $validated = $request->validate([
            'deadline' => 'required|date|after:today'
        ]);

        $clientIdFromProject = $deliverable->contract->proposal->project->client_id;

        if ($clientIdFromProject !== $client->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized action'
            ], 403);
        }

        if ($deliverable->payment?->status === 'escrow') {
            return response()->json([
                'success' => false,
                'message' => 'This deliverable is already funded'
            ], 409);
        }


        $result = DB::transaction(function () use ($deliverable, $validated, $client) {
            $freelancer_id = $deliverable->contract->proposal->freelancer->id;
            $deliverable->update([
                'deadline' => $validated['deadline'],
                'status' => 'unlocked',
                'unlocked_at' => now()
            ]);

            $payment = $deliverable->payment()->create([
                'client_id' => $client->id,
                'freelancer_id' => $freelancer_id,
                'status' => 'escrow',
                'amount' => $deliverable->amount
            ]);

            $deliverable = $deliverable->fresh();
            return [
                'id' => $deliverable->id,
                'contract_id' => $deliverable->contract_id,
                'title' => $deliverable->title,
                'description' => $deliverable->description,
                'amount' => $deliverable->amount,
                'deadline' => $deliverable->deadline,
                'status' => $deliverable->status,
                'position' => $deliverable->position,
                'created_at' => $deliverable->created_at,
                'unlocked_at' => $deliverable->unlocked_at,
                'payment' => $deliverable->payment ? [
                    'id' => $deliverable->payment->id,
                    'client_id' => $deliverable->payment->client_id,
                    'freelancer_id' => $deliverable->payment->freelancer_id,
                    'amount' => $deliverable->payment->amount,
                    'status' => $deliverable->payment->status,
                ] : null,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Deliverable funded successfully',
            'data' => $result
        ]);
    }
}
