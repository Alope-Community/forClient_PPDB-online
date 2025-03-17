<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterDataController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/pendaftaran-jalur-reguler', function () {
    return Inertia::render('PendaftaranJalurReguler');
});

Route::get('/pendaftaran-jalur-afirmasi', function () {
    return Inertia::render('PendaftaranJalurAfirmasi');
});

Route::get('/personal', function () {
    return Inertia::render('Profile/RegisterData');
})->middleware(['auth', 'verified']);

Route::post('/register-data', [RegisterDataController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
