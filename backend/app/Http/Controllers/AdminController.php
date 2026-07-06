<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Payment;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_users' => User::whereIn('role', ['client', 'freelancer'])->count(),
            'total_clients' => User::where('role', 'client')->count(),
            'total_freelancers' => User::where('role', 'freelancer')->count(),
            'total_projects' => Project::count(),
            'total_categories' => Category::count(),
            'total_skills' => Skill::count(),
            'projects_in_progress' => Project::where('status', 'in_progress')->count(),
            'escrow_amount' => Payment::where('status', 'escrow')->sum('amount'),
        ];

        $project_statuses = [
            'open' => Project::where('status', 'open')->count(),
            'in_review' => Project::where('status', 'in_review')->count(),
            'in_progress' => Project::where('status', 'in_progress')->count(),
            'completed' => Project::where('status', 'completed')->count(),
        ];

        return response()->json([
            'success' => true,
            'message' => 'Admin dashboard stats retrieved successfully',
            'data' => [
                'stats' => $stats,
                'project_statuses' => $project_statuses,
            ],
        ]);
    }

    public function index(Request $request)
    {
        $request->validate([
            'role' => ['nullable', Rule::in(['client', 'freelancer'])],
            'search' => 'nullable|string|max:255',
        ]);

        $query = User::query()
            ->select('id', 'first_name', 'last_name', 'email', 'role', 'phone', 'country', 'city', 'created_at')
            ->whereIn('role', ['client', 'freelancer']);

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%");
            });
        }

        $users = $query->latest()->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => trim($user->first_name . ' ' . $user->last_name),
                    'email' => $user->email,
                    'role' => $user->role,
                    'phone' => $user->phone,
                    'country' => $user->country,
                    'city' => $user->city,
                    'created_at' => $user->created_at,
                ];
            });

        return response()->json([
            'success' => true,
            'message' => 'Users retrieved successfully',
            'data' => $users,
        ]);
    }

    public function show(string $id)
    {
        $user = User::where('id', $id)
            ->whereIn('role', ['client', 'freelancer'])
            ->withCount('projects')
            ->with([
                'freelancer.category:id,name',
                'freelancer.skills:id,name',
                'freelancer.proposals:id,freelancer_id,project_id',
            ])->firstOrFail();

        $freelancer = $user->freelancer;
        $totalProjects = $user->role === 'freelancer' && $freelancer
            ? $freelancer->proposals->pluck('project_id')->unique()->count()
            : $user->projects_count;

        $data = [
            'id' => $user->id,
            'name' => trim($user->first_name . ' ' . $user->last_name),
            'email' => $user->email,
            'role' => $user->role,
            'phone' => $user->phone,
            'country' => $user->country,
            'city' => $user->city,
            'address' => $user->address,
            'created_at' => $user->created_at,
            'freelancer' => $freelancer ? [
                'title' => $freelancer->title,
                'bio' => $freelancer->bio,
                'portfolio_url' => $freelancer->portfolio_url,
                'resume_url' => $freelancer->resume_url,
                'category' => $freelancer->category?->name,
                'skills' => $freelancer->skills->map(function ($skill) {
                    return [
                        'id' => $skill->id,
                        'name' => $skill->name,
                    ];
                }),
            ] : null,
            'total_projects' => $totalProjects,
        ];

        return response()->json([
            'success' => true,
            'message' => 'User retrieved successfully',
            'data' => $data,
        ]);
    }
}
