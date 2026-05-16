<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);


        $data = [
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone' => $validated['phone'],
            'country' => $validated['country'],
            'address' => $validated['address'],
            'city' => $validated['city']
        ];

        if ($request->hasFile('avatar')) {
            if ($client->avatar && Storage::disk('public')->exists($client->avatar)) {
                Storage::disk('public')->delete($client->avatar);
            }
            $data['avatar'] = $request->file("avatar")->store("profiles", 'public');
        }

        $client->update($data);

        $clientFresh = $client->fresh();
        return response()->json([
            'success' => true,
            'message' => 'Profile updated Successfully',
            'data' => [
                ...$clientFresh->toArray(),
                'avatar_url' => $clientFresh->avatar ? asset("storage/" . $clientFresh->avatar) : null
            ]
        ]);
    }

}
