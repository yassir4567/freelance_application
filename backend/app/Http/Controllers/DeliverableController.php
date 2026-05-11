<?php

namespace App\Http\Controllers;

use App\Models\Deliverable;
use Illuminate\Http\Request;

class DeliverableController extends Controller
{
    //

    public function submit(Request $request, string $id)
    {

        $deliverable = Deliverable::findOrFail($id);

        $validated = $request->validate([
            'submission_note' => 'required|min:3|max:500',
            'links' => 'required|array|min:1',
            'links.*' => 'required|url'
        ]);

        $deliverable->update([
            'submission_note' => $validated['submission_note'],
            'deliverable_links' => $validated['links'],
            'submitted_at' => now(),
            'status' => 'submitted'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Deliverable Accepted successfully',
            'data' => $deliverable->fresh()
        ]);
    }
}
