<?php

namespace App\Http\Controllers\User\Settings;

use App\Http\Controllers\Controller;
use App\Models\RequestedDocument;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserDocumentReqController extends Controller
{
    public function fetchDocReq()
    {

        $docRequests = RequestedDocument::with([
            'user.resident:resident_id,resident_firstname,resident_middlename,resident_lastname,resident_suffix',
            'document:document_id,document_name,price',
        ])->latest()->get();


        $latestStatus = DB::table('notifications as n1')
            ->select('status_id', 'requested_document_id')
            ->whereRaw('created_at = (
        SELECT MAX(created_at)
        FROM notifications as n2
        WHERE n1.requested_document_id = n2.requested_document_id
        )');


        $docTracking = collect($latestStatus->get())->keyBy('requested_document_id');

        $flattenDocRequest = $docRequests->map((function ($docRequest) use ($docTracking) {
            $status = $docTracking[$docRequest->requested_document_id]->status_id ?? 5;

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

    public function deleteDocReq(Request $request)
    {
        $validate = $request->validate([
            'requested_document_id' => 'exists:requested_documents,requested_document_id',
            'status_id' => 'exists:statuses,status_id',
            'document_id' => 'exists:documents,document_id',
            'user_id' => 'exists:users,user_id',
        ]);

        DB::transaction(function () use ($validate) {
            $docRequest = RequestedDocument::findOrFail($validate['requested_document_id']);

            if ((int) $validate['status_id'] === 5) {
                $docRequest->delete();
            } else {
                throw ValidationException::withMessages([
                    'message' => 'You cannot delete the request once the document is approved.',
                ])->status(422);
            }
        });
    }
}
