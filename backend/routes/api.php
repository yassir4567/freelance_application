<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientDashboardController;
use App\Http\Controllers\ClientProjectController;
use App\Http\Controllers\ClientProposalController;
use App\Http\Controllers\FreelancerDashboardController;
use App\Http\Controllers\FreelancerProjectController;
use App\Http\Controllers\FreelancerProposalController;
use App\Http\Controllers\SkillController;
use Illuminate\Support\Facades\Route;

// * auth routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:client')->group(function () {
        Route::get('/client/dashboard', [ClientDashboardController::class, 'index']);

        Route::get('/client/projects', [ClientProjectController::class, 'index']);
        Route::get('/client/projects/{id}', [ClientProjectController::class, 'show']);

        Route::get('/client/projects/{id}/proposals', [ClientProposalController::class, 'index']);

        // ! : create new project for the client
        Route::post('/client/create-project', [ClientProjectController::class, 'store']);
    });

    Route::middleware('role:freelancer')->group(function () {
        Route::get('/freelancer/dashboard', [FreelancerDashboardController::class, 'index']);
        Route::get('/freelancer/projects', [FreelancerProjectController::class, 'index']);
        Route::get('/browse-projects/{id}', [FreelancerProjectController::class, 'show']);

        Route::get('/freelancer/proposals', [FreelancerProposalController::class, 'index']);
    });

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/skills', [SkillController::class, 'index']);
});
