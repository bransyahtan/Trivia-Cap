<?php

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

Route::get('/quizes', [QuizeController::class, 'index']);
Route::get('/quizes/add', [QuizeController::class, 'create']);
Route::post('/quizes/add', [QuizeController::class, 'store']);
Route::get('/quizes/{id}', [QuizeController::class, 'show']);
Route::delete('/quizes/{id}', [QuizeController::class, 'destroy']);


Route::get('/test', function () {
    return response()->json([
        'status' => "OK",
        "message" => "Learn Laravel"
    ]);
});


// Route::get('/kuis/detail/{id}', function () {
//     return view('pages/kuis/detail');
// });
