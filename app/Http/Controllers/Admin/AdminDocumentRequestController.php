<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RequestedDocument;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDocumentRequestController extends Controller
{
    public function fetchDocReqInfo()
    {

        $docRequest = RequestedDocument::with([
            'user.resident:resident_firstname,resident_middlename,resident_lastname,resident_suffix',
            'document:document_name,price'
        ])->get();

        // $docRequest = Status::get();

        // return \response()->json($docRequest);



        return Inertia::render('admin/DocumentRequest');
    }
}
