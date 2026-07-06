<?php

namespace App\Policies;

use App\Models\Contract;
use App\Models\User;

class ContractPolicy
{
    public function activate(User $user, Contract $contract)
    {
        return $user->role === 'client'
            && $contract->proposal->project->client_id === $user->id
            && $contract->status === 'pending';
    }
}
