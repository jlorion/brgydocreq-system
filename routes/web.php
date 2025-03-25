<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::inertia('/', 'landing/welcome')->name('landing.home');




Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
