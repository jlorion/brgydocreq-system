<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Notifications;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function showWelcome()
    {
        $documents = Document::all()->each->makeHidden(['created_at', 'updated_at']);

        return Inertia::render('landing/Welcome', [
            'documents' => $documents,
        ]);
    }
    public function showAbout()
    {

        return Inertia::render('landing/AboutUs');
    }

    public function showContact()
    {

        return Inertia::render('landing/ContactUs');
    }
}
