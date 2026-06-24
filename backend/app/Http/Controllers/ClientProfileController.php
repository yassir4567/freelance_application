<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateClientProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClientProfileController extends Controller
{
    //

    public function update(UpdateClientProfileRequest $request)
    {
        $client = $request->user();
        $validated = $request->validated();


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
