<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    //
    public function index(Request $request, string $id)
    {
        $conversation = Conversation::where('id', $id)
            ->with('messages')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Messages retrieved successfully',
            'data' => $conversation
        ]);
    }

    public function send(Request $request, string $id)
    {
        $sender = $request->user();
        $validated = $request->validate([
            'message' => 'required|max:255',
        ]);

        $message = Message::create([
            'sender_id' => $sender->id,
            'conversation_id' => $id,
            'message' => $validated['message'],
        ]);


        return response()->json([
            'success' => true,
            'message' => 'Message created successfully',
            'data' => $message
        ]);
    }

}
