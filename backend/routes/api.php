<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// * auth routes

Route::get('/', function () {
    return 'hello';
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});