<?php

namespace Database\Seeders;

use App\Models\Deliverable;
use App\Models\Payment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $deliverables = Deliverable::all();

        foreach ($deliverables as $deliverable) {
            $delStatus = $deliverable->status;


            if ($delStatus === 'pending') {
                $status = 'pending';
            } else if (in_array($delStatus, ['unlocked', 'submitted', 'revision_request'])) {
                $status = 'escrow';
            } else if ($delStatus === 'accepted') {
                $status = 'released';
            }
            Payment::create([
                'deliverable_id' => $deliverable->id,
                'price' => $deliverable->amount,
                'status' => $status
            ]);
        }
    }
}
