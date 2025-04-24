<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserDocumentController extends Controller
{
    public function showDocument()
    {
        $documents = Document::all()->each->makeHidden(['created_at', 'updated_at']);
       

        return Inertia::render('landing/Welcome', [
            'documents' => $documents
        ]);
    }
}
