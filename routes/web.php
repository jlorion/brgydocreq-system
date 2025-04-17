<?php

use App\Http\Controllers\Admin\AdminInvitationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Illuminate\Support\Facades\Mail;

// Route::get('/test-mail', function () {
// 	try {
// 		Mail::raw('This is a test email from Mailtrap!', function ($message) {
// 			$message->to('your-test-email@example.com') // Replace with a valid email
// 				->subject('Mailtrap Test');
// 		});

// 		return 'Test email sent successfully!';
// 	} catch (\Exception $e) {
// 		return 'Error: ' . $e->getMessage();
// 	}
// });


Route::inertia('/', 'landing/Welcome')->name('landing.home');
Route::inertia('/#about-us', 'landing/about')->name('landing.about-us');
Route::inertia('/about-us', 'landing/AboutUs')->name('landing.about-us');
Route::inertia('/contact-us', 'landing/ContactUs')->name('landing.contact-us');



require __DIR__ . '/settings.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/user.php';
