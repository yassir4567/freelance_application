<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class FeedbackController extends Controller
{
    //
    public function store(Request $request, $contractId)
    {

        $contract = Contract::findOrFail($contractId);

        Gate::authorize('leaveFeedback', $contract);

        $validated = $request->validate([
            "contenu" => "required|string",
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
