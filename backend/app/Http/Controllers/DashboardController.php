<?php

namespace App\Http\Controllers;

use App\Models\Freelancer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function stats(Request $request)
    {
        $user = $request->user();
        $stats = [];
        if ($user->role === 'freelancer') {
            $freelancer = Freelancer::where('user_id', $user->id)->first();
            $accepted_proposals_count = $freelancer->proposals()->where('status', 'accepted')->count();
            $stats['accepted_proposals_count'] = $accepted_proposals_count;
        }
        return response()->json(['data' => $stats]);
    }
}
