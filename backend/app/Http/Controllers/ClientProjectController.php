<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ClientProjectController extends Controller
{
    //

    public function index(Request $request)
    {
        $client = $request->user();

        $query = Project::select('id', 'title', 'budget', 'status', 'created_at')
            ->where('client_id', $client->id)
            ->withCount('proposals');

        if ($request->filled('search')) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('sort')) {
            $sort = $request->sort;
            if ($sort === 'oldest') {
                $query->oldest();
            } else {
                $query->latest();
            }
        }

        $projects = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Projects retrieved successfully',
            'data' => $projects
        ]);
    }

    public function show(Request $request) {}
}
