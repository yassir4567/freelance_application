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
        $projects = Project::select('id', 'status')->get();
        $freelancerIds = Freelancer::pluck('id');

        foreach ($projects as $project) {

            if ($freelancerIds->isEmpty()) {
                return;
            }

            if ($project->status === 'open') {
                $count = rand(0, $freelancerIds->count());

                $selectedFreelancers = $freelancerIds->shuffle()->take($count);

                foreach ($selectedFreelancers as $freelancerId) {
                    Proposal::factory()->create([
                        'project_id' => $project->id,
                        'freelancer_id' => $freelancerId,
                        'status' => fake()->randomElement(['pending', 'rejected'])
                    ]);
                }

                continue;
            }

            if (in_array($project->status, ['completed', 'in_progress'])) {
                $count = rand(1, $freelancerIds->count());

                $selectedFreelancers = $freelancerIds->shuffle()->take($count);

                $acceptedFreelancerId = $selectedFreelancers->first();

                Proposal::factory()->create([
                    'project_id' => $project->id,
                    'freelancer_id' => $acceptedFreelancerId,
                    'status' => 'accepted',
                ]);

                foreach ($selectedFreelancers->skip(1) as $freelancerId) {
                    Proposal::factory()->create([
                        'project_id' => $project->id,
                        'freelancer_id' => $freelancerId,
                        'status' => 'rejected',
                    ]);
                }

                continue;
            }

            $count = rand(1, $freelancerIds->count());

            $selectedFreelancers = $freelancerIds->shuffle()->take($count);

            $acceptedFreelancerId = $selectedFreelancers->first();

            Proposal::factory()->create([
                'project_id' => $project->id,
                'freelancer_id' => $acceptedFreelancerId,
                'status' => 'accepted'
            ]);

            foreach ($selectedFreelancers->skip(1) as $freelancerId) {
                Proposal::factory()->create([
                    'project_id' => $project->id,
                    'freelancer_id' => $freelancerId,
                    'status' => fake()->randomElement(['pending', 'accepted', 'rejected'])
                ]);
            }
        }
    }
}
