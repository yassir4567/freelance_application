<?php

namespace Database\Seeders;

use App\Models\Contract;
use App\Models\Conversation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConversationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $contractIds = Contract::pluck('id');
        foreach ($contractIds as $contract_id) {
            Conversation::create([
                'contract_id' => $contract_id
            ]);
        }
    }
}
