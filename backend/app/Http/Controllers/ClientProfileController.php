<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientProfileController extends Controller
{
    //

    public function update(Request $request)
    {
        $client = $request->user();
        $validated = $request->validate([
            'first_name' => 'required|string|max:25',
            'last_name' => 'required|string|max:25',
            'phone' => 'nullable|string',
            'country' => 'nullable|string',
            'avatar' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
        ]);

        $client->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated Successfully',
            'data' => $client->fresh()
        ]);
    }

}
