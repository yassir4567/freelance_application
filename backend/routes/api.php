<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientDashboardController;
use App\Http\Controllers\FreelancerDashboardController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

// * auth routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // * dashboard routes 
    Route::get('/client/dashboard', [ClientDashboardController::class, 'index']);
    Route::get('/freelancer/dashboard', [FreelancerDashboardController::class, 'index']);

    // * projects routes 
    Route::get('/projects', [ProjectController::class, 'index']);

    // * categories routes 
    Route::get('/categories' , [CategoryController::class , 'index']) ;
});
