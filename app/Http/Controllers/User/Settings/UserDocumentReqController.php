<?php

namespace App\Http\Controllers\User\Settings;

use App\Http\Controllers\Controller;
use App\Models\Notifications;
use App\Models\RequestedDocument;
use Inertia\Inertia;

class UserDocumentReqController extends Controller
{
    public function fetchDocReq()
    {

        $docRequests = RequestedDocument::with([
            'user.resident:resident_id,resident_firstname,resident_middlename,resident_lastname,resident_suffix',
            'document:document_id,document_name,price',
        ])->get();


        $docReqId = $docRequests->pluck('requested_document_id');

        $docTracking = Notifications::whereIn('requested_document_id', $docReqId)
            ->where('status_id', '!=', 1)
            ->get(['status_id', 'requested_document_id']);

        $flattenDocRequest = $docRequests->map((function ($docRequest) use ($docTracking) {
            $status = $docTracking[$docRequest->requested_document_id]->status_id;

            return [
                'requested_document_id' => $docRequest->requested_document_id,
                'user_id' => $docRequest->user_id,
                'resident_firstname' => $docRequest->user->resident->resident_firstname,
                'resident_lastname' => $docRequest->user->resident->resident_lastname,
                'document_id' => $docRequest->document_id,
                'requested_purpose' => $docRequest->requested_purpose,
                'document_name' => $docRequest->document->document_name,
                'attachment_path' => $docRequest->attachment_path,
                'amount' => $docRequest->document->price,
                'created_at' => $docRequest->created_at,
                'status_id' => $status,
            ];
        }));

        // return \response()->json($flattenDocRequest);

        return Inertia::render('user/settings/DocumentRequest', [
            'docprocessing' => $flattenDocRequest,
        ]);
    }
}
