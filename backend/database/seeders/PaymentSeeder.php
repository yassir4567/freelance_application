<?php

namespace Database\Seeders;

use App\Models\Deliverable;
use App\Models\Payment;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $deliverables = Deliverable::with([
            'contract.proposal.project',
        ])->get();

        foreach ($deliverables as $deliverable) {
            $delStatus = $deliverable->status;
            $freelancer_id = $deliverable->contract->proposal->freelancer_id;
            $client_id = $deliverable->contract->proposal->project->client_id;

            if (in_array($delStatus, ['unlocked', 'submitted', 'revision_request'])) {
                $status = 'escrow';
            } elseif ($delStatus === 'accepted') {
                $status = 'released';
            }

            Payment::create([
                'deliverable_id' => $deliverable->id,
                'freelancer_id' => $freelancer_id,
                'client_id' => $client_id,
                'amount' => $deliverable->amount,
                'status' => $status,
            ]);
        }
    }
}
