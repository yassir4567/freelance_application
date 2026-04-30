<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $conversations = Conversation::select('id', 'contract_id')
            ->with([
                'contract.proposal.freelancer.user:id',
                'contract.proposal.project.client:id'
            ])->get();
        foreach ($conversations as $conversation) {
            $client_id = $conversation->contract->proposal->project->client->id;
            $freelancer_id = $conversation->contract->proposal->freelancer->user->id;
            $count = rand(5, 10);
            for ($i = 1; $i <= $count; $i++) {
                Message::factory()->create([
                    'conversation_id' => $conversation->id,
                    'sender_id' => $i % 2 === 0 ? $client_id : $freelancer_id
                ]);
            }
        }
    }
}
