<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\QuizeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('pages/home');
});

// ADMIN PANEL
Route::get('/quizes', [QuizeController::class, 'index']);
Route::get('/quizes/add', [QuizeController::class, 'create']);
Route::post('/quizes/add', [QuizeController::class, 'store']);
Route::get('/quizes/{id}', [QuizeController::class, 'show']);
Route::delete('/quizes/{id}', [QuizeController::class, 'destroy']);

Route::get('/avatars', [AvatarController::class, 'index']);
Route::get('/avatars/add', [AvatarController::class, 'create']);
Route::post('/avatars/add', [AvatarController::class, 'store']);
Route::get('/avatars/{id}', [AvatarController::class, 'show']);
Route::delete('/avatars/{id}', [AvatarController::class, 'destroy']);


// API
Route::get('/api/quizes', [QuizeController::class, "findAll"]);
Route::get('/api/quizes/{id}', [QuizeController::class, "findById"]);

Route::get('/api/avatars', [AvatarController::class, "findAll"]);
Route::get('/api/avatars/{id}', [AvatarController::class, "findById"]);
