<?php

namespace App\Http\Controllers;

use App\Models\Freelancer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid email or password',
            ], 401);
        }

        $user = User::find(Auth::id());
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in successfully',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'role' => $user->role,
                ],
                'profile' => $user->getProfileCompletion(),
                'token' => $token,
            ],
        ], 200);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:25',
            'last_name' => 'required|string|max:25',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:client,freelancer',
        ]);


        $result = DB::transaction(function () use ($validated) {
            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
            ]);

            if ($validated['role'] === 'freelancer') {
                Freelancer::create([
                    'user_id' => $user->id
                ]);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'user' => $user,
                'token' => $token
            ];
        });


        return response()->json(
            [
                'message' => 'User created successfully',
                'data' => [
                    'user' => [
                        'id' => $result['user']->id,
                        'first_name' => $result['user']->first_name,
                        'last_name' => $result['user']->last_name,
                        'email' => $result['user']->email,
                        'role' => $result['user']->role,
                    ],
                    'profile' => $result['user']->getProfileCompletion(),
                    'token' => $result['token']
                ]
            ],
            201
        );
    }

    public function logout(Request $request)
    {

        $token = $request->user()->currentAccessToken();
        $token->delete();
        return response()->json(['message' => 'Logged out successefuly']);
    }

    public function me(Request $request)
    {

        $user = $request->user();

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'profile' => $user->getProfileCompletion()
            ]
        ]);
    }
}
