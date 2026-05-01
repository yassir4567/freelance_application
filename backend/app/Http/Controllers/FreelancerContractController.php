<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use Illuminate\Http\Request;

class FreelancerContractController extends Controller
{
    //
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
