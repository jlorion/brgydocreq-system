<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notifications;
use App\Models\Processing;
use App\Models\RequestedDocument;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class AdminDocumentRequestController extends Controller
{
    public function fetchDocReq()
    {

        $docRequests = RequestedDocument::with([
            'user.resident:resident_id,resident_firstname,resident_middlename,resident_lastname,resident_suffix',
            'document:document_id,document_name,price',
            'status:status_id,status_name'
        ])->get();

        $flatterDocRequest = $docRequests->map((function ($docRequest) {
            return [
                'requested_document_id' => $docRequest->requested_document_id,
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
                'docreq_status' => $docRequest->status->status_name
            ];
        }));

        // return \response()->json($flatterDocRequest);

        return Inertia::render('admin/DocumentRequest', [
            'docrequests' => $flatterDocRequest
        ]);
    }

    public function rejectDocReq(Request $request)
    {
        $validate = $request->validate([
            'requested_document_id' => 'required|exists:requested_documents,requested_document_id',
            'admin_id' => 'required|exists:admins,admin_id',
            'status_id' => 'required|exists:statuses,status_id',
            'additional_message' => 'required|string|max:200',
            'notification' => 'required|string|max:100'
        ]);

        $validate['admin_id'] = \auth('admin')->id();

        DB::transaction(function () use ($validate) {

            Notifications::create($validate);

            RequestedDocument::findOrFail($validate['requested_document_id'])
                ->update([
                    'status_id' => $validate['status_id']
                ]);
        });
    }

    public function approveDocReq(Request $request)
    {
        $validate = $request->validate([
            'requested_document_id' => 'required|exists:requested_documents,requested_document_id',
            'admin_id' => 'required|exists:admins,admin_id',
            'status_id' => 'required|exists:statuses,status_id',
            'additional_message' => 'nullable|string|max:200',
            'notification' => 'required|string|max:100'
        ]);


        $processing = collect($validate)->except(['additional_message', 'notification'])->toArray();

        $validate['admin_id'] = \auth('admin')->id();

        DB::transaction(function () use ($validate, $processing) {
            Notifications::create($validate);
            Processing::create($processing);
            RequestedDocument::findOrFail($validate['requested_document_id'])
                ->update([
                    'status_id' => $validate['status_id']
                ]);
        });
    }
}
