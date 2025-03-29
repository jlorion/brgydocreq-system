<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::inertia('/', 'landing/Welcome')->name('landing.home');
Route::inertia('/request-reference', 'auth/RequestReference')->name('auth.request-reference');
Route::inertia('/about-us', 'landing/AboutUs')->name('landing.about-us');
Route::inertia('/contact-us', 'landing/ContactUs')->name('landing.contact-us');




Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
