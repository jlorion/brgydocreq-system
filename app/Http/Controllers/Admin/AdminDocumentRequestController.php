<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDocumentRequestController extends Controller
{
    public function fetchDocReqInfo()
    {
        

        return Inertia::render('admin/DocumentRequest');
    }


}
