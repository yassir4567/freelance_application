<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FreelancerProfileController extends Controller
{
    //
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => 'required|string|max:25',
            'last_name' => 'required|string|max:25',
            'phone' => 'nullable|string',
            'country' => 'nullable|string',
            'avatar' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'title' => 'nullable|string',
            'portfolio' => 'nullable|url',
            'bio' => 'nullable|string'
        ]);

        $user->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone' => $validated['phone'] ?? null,
            'country' => $validated['country'] ?? null,
            'avatar' => $validated['avatar'] ?? null,
            'address' => $validated['address'] ?? null,
            'city' => $validated['city'] ?? null,
        ]);

        $user->freelancer()->update([
            'title' => $validated['title'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'portfolio_url' => $validated['portfolio'] ?? null,
        ]);


        return response()->json([
            'success' => true,
            'message' => 'Profile updated Successfully',
            'data' => $user->fresh()->load('freelancer')
        ]);
    }

}
