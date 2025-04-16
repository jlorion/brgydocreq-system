<?php

use App\Http\Controllers\Admin\AdminInvitationController;
use App\Http\Controllers\Admin\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Illuminate\Support\Facades\Mail;

// Route::get('/test-mail', function () {
//     Mail::raw('This is a test email from Mailtrap!', function ($message) {
//         $message->to('your-test-email@example.com') // This can be any dummy email
//                 ->subject('Mailtrap Test');
//     });

//     return 'Test email sent!';
// });

Route::get('/admins', [RoleController::class, 'index'])->name('admin.admins');
Route::get('/admin/register/validate', [AdminInvitationController::class, 'validateToken'])->name('admin.register.validate');
Route::get('/admin/register', [AdminInvitationController::class, 'show'])->name('admin.register');

Route::inertia('/', 'landing/Welcome')->name('landing.home');
Route::inertia('/#about-us', 'landing/about')->name('landing.about-us');
Route::inertia('/about-us', 'landing/AboutUs')->name('landing.about-us');
Route::inertia('/contact-us', 'landing/ContactUs')->name('landing.contact-us');




Route::inertia('/admin/dashboard', 'admin/Dashboard')->name('admin.dashboard');
Route::inertia('/admin/archives', 'admin/Archives')->name('admin.archives');
Route::inertia('/admin/documents', 'admin/Documents')->name('admin.documents');
Route::inertia('/admin/document-request', 'admin/DocumentRequest')->name('admin.document-request');
Route::inertia('/admin/on-process', 'admin/OnProcess')->name('admin.on-process');
Route::inertia('/admin/residents', 'admin/Residents')->name('admin.residents');

Route::middleware(['auth', 'verified'])->group(function () {});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
