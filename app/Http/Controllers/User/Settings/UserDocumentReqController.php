<?php

namespace App\Http\Controllers\User\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserDocumentReqController extends Controller
{
    public function index(){
        return Inertia::render('user/settings/DocumentRequest');
    }
}
