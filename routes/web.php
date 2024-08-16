<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/proceed', function () {
    return view('proceed');
})->name('proceed');

Route::get('/chat', [HomeController::class, 'index'])->name('chat');
Route::get('/users', [HomeController::class, 'users'])->name('users');
Route::get('/messages', [HomeController::class, 'messages'])->name('messages');
Route::post('/message', [HomeController::class, 'message'])->name('message');
