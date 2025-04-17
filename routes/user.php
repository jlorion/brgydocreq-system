<?php

use App\Http\Controllers\User\UserAuthSessionController;
use App\Http\Controllers\User\UserNewPasswordController;
use App\Http\Controllers\User\UserPasswordResetLinkController;
use App\Http\Controllers\User\UserRegistrationController;
use App\Http\Controllers\User\UserResidentReferenceController;
use Illuminate\Support\Facades\Route;

Route::prefix('user')->name('user.')->group(function () {
	Route::middleware(['guest:web'])->group(function () {

		Route::get('/register', [UserRegistrationController::class, 'create'])->name('register');
		Route::post('register/store', [UserRegistrationController::class, 'store'])->name('register.store');
		Route::get('/login', [UserAuthSessionController::class, 'create'])->name('login');
		Route::post('/login/store', [UserAuthSessionController::class, 'store'])->name('login.store');
		Route::get('/resident-reference', [UserResidentReferenceController::class, 'create'])->name('resident-reference');

		Route::post('/resident-reference/store', [UserResidentReferenceController::class, 'store'])->name('resident-reference.store');

		Route::get('/forgot-password', [UserPasswordResetLinkController::class, 'create'])->name('forgot-password');

		Route::post('forgot-password', [UserPasswordResetLinkController::class, 'store'])->name('password.email');

		Route::get('reset-password/{token}', [UserNewPasswordController::class, 'create'])->name('password.reset');

		Route::post('reset-password', [UserNewPasswordController::class, 'store'])->name('password.store');
	});

	// Route::middleware('auth:web')->group(function () {
	//     // Route::get('verify-email', EmailVerificationPromptController::class)
	//     //     ->name('verification.notice');

	//     // Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
	//     //     ->middleware(['signed', 'throttle:6,1'])
	//     //     ->name('verification.verify');

	//     // Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
	//     //     ->middleware('throttle:6,1')
	//     //     ->name('verification.send');

	//     // Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
	//     //     ->name('password.confirm');

	//     // Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

	//     Route::post('logout', [UserAuthSessionController::class, 'destroy'])
	//         ->name('logout');
	// });
});
