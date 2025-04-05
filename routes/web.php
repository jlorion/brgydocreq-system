<?php

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



Route::inertia('/', 'landing/Welcome')->name('landing.home');
Route::inertia('/#about-us', 'landing/about')->name('landing.about-us');
Route::inertia('/about-us', 'landing/AboutUs')->name('landing.about-us');
Route::inertia('/contact-us', 'landing/ContactUs')->name('landing.contact-us');




Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/Dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
