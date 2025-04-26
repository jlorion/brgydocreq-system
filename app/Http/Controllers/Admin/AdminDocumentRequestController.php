<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RequestedDocument;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class AdminDocumentRequestController extends Controller
{
    public function fetchDocReqInfo()
    {

        $docRequests = RequestedDocument::with([
            'user.resident:resident_id,resident_firstname,resident_middlename,resident_lastname,resident_suffix',
            'document:document_id,document_name,price'
        ])->get();

        $flatterDocRequest = $docRequests->map((function ($docRequest) {
            return [
                'user_id' => $docRequest->user_id,
                'resident_firstname' => $docRequest->user->resident->resident_firstname,
                'resident_middlename' => $docRequest->user->resident->resident_middlename,
                'resident_lastname' => $docRequest->user->resident->resident_lastname,
                'resident_suffix' => $docRequest->user->resident->resident_suffix,
                'document_id' => $docRequest->document_id,
                'requested_purpose' => $docRequest->requested_purpose,
                'document_name' => $docRequest->document->document_name,
                'attachment_path' => $docRequest->attachment_path,
                'amount' => $docRequest->document->price,
                'date_requested' => $docRequest->created_at,
            ];
        }));


        // return \response()->json($flatterDocRequest);



        return Inertia::render('admin/DocumentRequest', [
            'docrequests' => $flatterDocRequest
        ]);
    }
}
