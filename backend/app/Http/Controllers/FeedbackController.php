<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    //
    public function store(Request $request, $contractId)
    {

        $contract = Contract::findOrFail($contractId);

        if ($contract->status !== 'completed') {
            return response()->json([
                'success' => false,
                'message' => 'only completed contract can get feedback'
            ]);
        }

        $client = $request->user();

        if ($contract->proposal->project->client_id !== $client->id) {
            return response()->json([
                'success' => false,
                'message' => 'unauthorized'
            ]);
        }

        if ($contract->feedback()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'feedback already exists for this contract'
            ], 409);
        }

        $validated = $request->validate([
            'contenu' => "required|string",
            "note" => "required|integer|min:0|max:5"
        ]);

        $feedback = Feedback::create([
            'contenu' => $validated['contenu'],
            'note' => $validated['note'],
            'contract_id' => $contractId
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Feedback stored successfully',
            'data' => $feedback
        ]);

    }
}
