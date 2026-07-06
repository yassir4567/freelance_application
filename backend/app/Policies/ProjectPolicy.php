<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{

    public function viewClientProject(User $user, Project $project)
    {
        return $user->role === 'client' && $user->id === $project->client_id;
    }

    public function viewAvailableProject(User $user, Project $project)
    {
        return $user->role === 'freelancer'
            && in_array($project->status, ['open', 'in_review'], true);
    }

    public function clientViewProposals(User $user, Project $project)
    {
        return $user->role === 'client' && $user->id === $project->client_id;
    }

    public function sendProposal(User $user, Project $project)
    {
        return $user->role === 'freelancer' && in_array($project->status, ['open', 'in_review'], true);
    }
}
