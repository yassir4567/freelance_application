<?php

namespace Database\Seeders;

use App\Models\Contract;
use App\Models\Deliverable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            if ($contract->status === 'active') {
                Deliverable::factory()->accepted()->create([
                    'contract_id' => $contract->id,
                    'title' => 'First deliverable'
                ]);

                Deliverable::factory()->accepted()->create([
                    'contract_id' => $contract->id,
                    'title' => 'Second deliverable'
                ]);

                if ($index % 2 === 0) {
                    Deliverable::factory()->submitted()->create([
                        'contract_id' => $contract->id,
                        'title' => 'Third deliverable'
                    ]);
                } else {
                    Deliverable::factory()->revisionRequest()->create([
                        'contract_id' => $contract->id,
                        'title' => 'Third deliverable'
                    ]);
                }

                Deliverable::factory()->create([
                    'contract_id' => $contract->id,
                    'title' => 'Final deliverable'
                ]);
            } else if ($contract->status === 'completed') {
                Deliverable::factory()->count(4)->accepted()->create([
                    'contract_id' => $contract->id,
                ]);
            }
        }
    }
}
