<?php

namespace Database\Seeders;

use App\Models\Contract;
use App\Models\Deliverable;
use Illuminate\Database\Seeder;

class DeliverableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $contracts = Contract::whereIn('status', ['active', 'completed'])->get();

        foreach ($contracts as $index => $contract) {
            $deliverablePrice = $contract->final_price / 4;
            if ($contract->status === 'active') {
                Deliverable::factory()->accepted()->create([
                    'contract_id' => $contract->id,
                    'title' => 'First deliverable',
                    'amount' => $deliverablePrice,
                ]);

                Deliverable::factory()->accepted()->create([
                    'contract_id' => $contract->id,
                    'title' => 'Second deliverable',
                    'amount' => $deliverablePrice,

                ]);

                if ($index % 2 === 0) {
                    Deliverable::factory()->submitted()->create([
                        'contract_id' => $contract->id,
                        'title' => 'Third deliverable',
                        'amount' => $deliverablePrice,
                    ]);
                } else {
                    Deliverable::factory()->revisionRequest()->create([
                        'contract_id' => $contract->id,
                        'title' => 'Third deliverable',
                        'amount' => $deliverablePrice,
                    ]);
                }

                Deliverable::factory()->create([
                    'contract_id' => $contract->id,
                    'title' => 'Final deliverable',
                    'amount' => $deliverablePrice,
                ]);
            } elseif ($contract->status === 'completed') {
                Deliverable::factory()->count(4)->accepted()->create([
                    'contract_id' => $contract->id,
                    'amount' => $deliverablePrice,
                ]);
            }
        }
    }
}
