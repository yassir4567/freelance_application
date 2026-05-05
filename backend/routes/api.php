<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientContractController;
use App\Http\Controllers\ClientDashboardController;
use App\Http\Controllers\ClientProfileController;
use App\Http\Controllers\ClientProjectController;
use App\Http\Controllers\ClientProposalController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FreelancerContractController;
use App\Http\Controllers\FreelancerDashboardController;
use App\Http\Controllers\FreelancerProfileController;
use App\Http\Controllers\FreelancerProjectController;
use App\Http\Controllers\FreelancerProposalController;
use App\Http\Controllers\MessageController;
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

        // ? project
        Route::get('/client/projects', [ClientProjectController::class, 'index']);
        Route::get('/client/projects/{id}', [ClientProjectController::class, 'show']);
        Route::get('/client/projects/{id}/proposals', [ClientProposalController::class, 'index']);
        Route::post('/client/create-project', [ClientProjectController::class, 'store']);

        // ? contracts
        Route::get('/client/contracts', [ClientContractController::class, 'index']);
        Route::get('/client/contracts/stats', [ClientContractController::class, 'stats']);
        Route::get('/client/contracts/{id}', [ClientContractController::class, 'show']);

        // ? profile 
        Route::put('/client/update-profile', [ClientProfileController::class, 'update']);
    });

    Route::middleware('role:freelancer')->group(function () {
        Route::get('/freelancer/dashboard', [FreelancerDashboardController::class, 'index']);
        Route::get('/freelancer/projects', [FreelancerProjectController::class, 'index']);
        Route::get('/browse-projects/{id}', [FreelancerProjectController::class, 'show']);

        // ? proposals
        Route::get('/freelancer/proposals', [FreelancerProposalController::class, 'index']);
        Route::post('/projects/{projectId}/send-proposal', [FreelancerProposalController::class, 'sendProposal']);

        // ? contracts 
        Route::get('/freelancer/contracts/stats', [FreelancerContractController::class, 'stats']);
        Route::get('/freelancer/contracts', [FreelancerContractController::class, 'index']);
        Route::get('/freelancer/contracts/{id}', [FreelancerContractController::class, 'show']);

        // ? profile 
        Route::put('/freelancer/update-profile', [FreelancerProfileController::class, 'update']);
    });

    // ? categories & skills
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/skills', [SkillController::class, 'index']);

    // ? conversations 
    Route::get('/conversations', [ConversationController::class, 'index']);

    // ? messages 
    Route::get('/conversations/{id}/messages', [MessageController::class, 'index']);
});
