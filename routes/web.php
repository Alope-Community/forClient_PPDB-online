<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EditProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterDataController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Registration
Route::get('/pendaftaran-jalur-reguler', [RegistrationController::class, 'regularPath'])->middleware(['auth']);
Route::get('/pendaftaran-jalur-afirmasi', [RegistrationController::class, 'afirmationPath'])->middleware(['auth']);
Route::post('/registration', [RegistrationController::class, 'registration'])->middleware(['auth']);
Route::post('/update-document', [RegistrationController::class, 'updateDocument'])->middleware(['auth']);

Route::get('/register-data', function () {
    return Inertia::render('Profile/RegisterData');
})->middleware(['auth', 'verified'])->name('register-data-get');

Route::post('/register-data', [RegisterDataController::class, 'store'])->middleware(['auth', 'verified'])->name('register-data-post');

Route::get('/edit-profile', [EditProfileController::class, 'edit'])->middleware(['auth', 'verified'])->name('edit-profile');

Route::post('/edit-profile', [EditProfileController::class, 'update'])->middleware(['auth', 'verified'])->name('update-profile');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
