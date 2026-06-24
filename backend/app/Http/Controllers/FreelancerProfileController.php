<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateFreelancerProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FreelancerProfileController extends Controller
{
    //
    public function update(UpdateFreelancerProfileRequest $request)
    {
        $user = $request->user();

        $validated = $request->validated();

        $userData = [
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone' => $validated['phone'] ?? null,
            'country' => $validated['country'] ?? null,
            'address' => $validated['address'] ?? null,
            'city' => $validated['city'] ?? null,
        ];

        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $userData['avatar'] = $request->file("avatar")->store("profiles", 'public');
        }

        $user->update($userData);

        $user->freelancer()->update([
            'title' => $validated['title'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'portfolio_url' => $validated['portfolio'] ?? null,
            'category_id' => $validated['category_id'] ?? null
        ]);

        $userFresh = $user->fresh()->load('freelancer');
        return response()->json([
            'success' => true,
            'message' => 'Profile updated Successfully',
            'data' => [
                ...$userFresh->toArray(),
                "avatar_url" => $userFresh->avatar ? asset("storage/" . $userFresh->avatar) : null
            ]
        ]);
    }

}
