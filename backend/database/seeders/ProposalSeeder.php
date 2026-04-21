<?php

namespace Database\Seeders;

use App\Models\Freelancer;
use App\Models\Project;
use App\Models\Proposal;
use Illuminate\Database\Seeder;

class ProposalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $projectIds = Project::pluck('id');
        $freelancerIds = Freelancer::pluck('id');

        foreach ($projectIds as $projectId) {
            $count = rand(0, $freelancerIds->count());

            $selectedFreelancers = $freelancerIds->shuffle()->take($count);

            foreach ($selectedFreelancers as $freelancerId) {
                Proposal::factory()->create([
                    'project_id' => $projectId,
                    'freelancer_id' => $freelancerId,
                ]);
            }
        }
    }
}
