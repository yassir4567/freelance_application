<?php

namespace Database\Seeders;

use App\Models\Contract;
use App\Models\Proposal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function PHPUnit\Framework\isEmpty;

class ContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $acceptedProposals = Proposal::where('status', 'accepted')->get();

        if ($acceptedProposals->isEmpty()) {
            return;
        }

        $contractsByProjects = [];

        foreach ($acceptedProposals as $proposal) {
            $contract = Contract::create([
                'proposal_id' => $proposal->id
            ]);
            $contractsByProjects[$proposal->project_id][] = $contract;
        }

        foreach ($contractsByProjects as $project_id => $contracts) {
            if (empty($contracts)) {
                continue;
            }

            $active = fake()->boolean(70);

            if (!$active) {
                continue;
            }

            $activeContract = collect($contracts)->random();

            $activeContract->update([
                'status' => 'active'
            ]);

            foreach ($contracts as $contract) {
                if ($contract->id !== $activeContract->id) {
                    $contract->update([
                        'status' => 'rejected'
                    ]);
                }
            }

            Proposal::where('project_id', $project_id)
                ->where('id' ,  "!=" , $activeContract->proposal_id)
                ->update([
                    'status' => 'rejected'
                ]);
        }
    }
}
