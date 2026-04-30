<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
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
}
