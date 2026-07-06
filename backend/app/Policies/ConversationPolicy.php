<?php

namespace App\Policies;

use App\Models\Conversation;
use App\Models\User;

class ConversationPolicy
{

    public function viewAny(User $user)
    {
        return in_array($user->role, ['client', 'freelancer'] , true);
    }

    public function readMessages(User $user, Conversation $conversation)
    {
        $role = $user->role;
        if ($role === 'client') {
            return $user->id === $conversation->contract->proposal->project->client_id;
        }
        if ($role === 'freelancer') {
            return $user->id === $conversation->contract->proposal->freelancer->user_id;
        }
        return false;
    }

    public function sendMessage(User $user, Conversation $conversation)
    {
        $role = $user->role;
        if ($role === 'client') {
            return $user->id === $conversation->contract->proposal->project->client_id;
        }
        if ($role === 'freelancer') {
            return $user->id === $conversation->contract->proposal->freelancer->user_id;
        }
        return false;
    }
}
