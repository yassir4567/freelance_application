<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use Illuminate\Http\Request;

class ClientContractController extends Controller
{
    //
    public function index()
    {
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
