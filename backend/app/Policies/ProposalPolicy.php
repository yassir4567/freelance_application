<?php

namespace App\Policies;

use App\Models\Proposal;
use App\Models\User;

class ProposalPolicy
{
    public function accept(User $user, Proposal $proposal)
    {
        return $user->role === 'client'
            && $proposal->project->client_id === $user->id
            && $proposal->status === 'pending'
            && in_array($proposal->project->status, ["open", "in_review"], true);
    }

    public function reject(User $user, Proposal $proposal)
    {
        return $user->role === 'client'
            && $proposal->project->client_id === $user->id
            && $proposal->status === 'pending'
            && in_array($proposal->project->status, ["open", "in_review"], true);
        ;
    }
}
