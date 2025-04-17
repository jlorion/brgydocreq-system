<?php

use App\Http\Controllers\Admin\AdminAdminsController;
use App\Http\Controllers\Admin\AdminArchivesController;
use App\Http\Controllers\Admin\AdminAuthSessionController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminDocumentRequestController;
use App\Http\Controllers\Admin\AdminDocumentsController;
use App\Http\Controllers\Admin\AdminInvitationController;
use App\Http\Controllers\Admin\AdminOnProcessController;
use App\Http\Controllers\Admin\AdminRegistrationController;
use App\Http\Controllers\Admin\AdminResidentsController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use Illuminate\Support\Facades\Route;



Route::prefix('admin')->name('admin.')->group(function () {

	Route::middleware(['guest:admin'])->group(function () {
		Route::get('/register/validate', [AdminInvitationController::class, 'validateToken'])->name('register.validate');
		Route::get('/register', [AdminInvitationController::class, 'show'])->name('register');

		Route::post('/register/store', [AdminRegistrationController::class, 'store'])->name('register.store');
		Route::get('/login', [AdminAuthSessionController::class, 'create'])->name('login');
		Route::post('/login/store', [AdminAuthSessionController::class, 'store'])->name('login.store');
		Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('forgot-password');
	});

	Route::middleware(['auth:admin'])->group(function () {
		Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
		Route::get('/document-request', [AdminDocumentRequestController::class, 'index'])->name('document-request');
		Route::get('/on-process', [AdminOnProcessController::class, 'index'])->name('on-process');
		Route::get('/archives', [AdminArchivesController::class, 'index'])->name('archives');
		Route::get('/documents', [AdminDocumentsController::class, 'index'])->name('documents');
		Route::get('/residents', [AdminResidentsController::class, 'index'])->name('residents');
		Route::get('/admins', [AdminAdminsController::class, 'index'])->name('admins');
		Route::post('/invite', [AdminInvitationController::class, 'sendInvitation'])->name('invite');
		Route::post('logout', [AdminAuthSessionController::class, 'destroy'])->name('logout');
	});
});
