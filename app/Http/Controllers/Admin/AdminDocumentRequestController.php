<?php

namespace App\Http\Controllers\Admin;

use App\Events\DocRequestSubmitted;
use App\Http\Controllers\Controller;
use App\Models\DocumentArchive;
use App\Models\Notifications;
use App\Models\Processing;
use App\Models\RequestedDocument;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class AdminDocumentRequestController extends Controller
{
    public function fetchDocReq()
    {

        $docRequests = RequestedDocument::with([
            'user.resident:resident_id,resident_firstname,resident_middlename,resident_lastname,resident_suffix',
            'document:document_id,document_name,price',
            'status:status_id,status_name'
        ])->latest()->get();

        $flatterDocRequest = $docRequests->map((function ($docRequest) {
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
                'status_name' => $docRequest->status->status_name
            ];
        }));

        // return \response()->json($flatterDocRequest);

        return Inertia::render('admin/DocumentRequest', [
            'docprocessing' => $flatterDocRequest
        ]);
    }

    public function rejectDocReq(Request $request)
    {
        $validate = $request->validate([
            'requested_document_id' => 'required|exists:requested_documents,requested_document_id',
            'admin_id' => 'required|exists:admins,admin_id',
            'user_id' => 'required|exists:users,user_id',
            'status_id' => 'required|exists:statuses,status_id',
            'additional_message' => 'required|string|max:200',
            'notification' => 'required|string|max:100'
        ]);


        DB::transaction(function () use ($validate) {

            $notification = Notifications::create($validate);
            $status = $notification->status->status_name;

            RequestedDocument::findOrFail($validate['requested_document_id'])
                ->update([
                    'status_id' => $validate['status_id']
                ]);

            if ($validate['status_id'] === 1) {
                DocumentArchive::create([
                    'status_id' => $validate['status_id'],
                    'admin_id' => $validate['admin_id'],
                    'requested_document_id' => $validate['requested_document_id'],
                    'notification_id' => $notification->getKey()
                ]);
            }
        });
    }

    public function approveDocReq(Request $request)
    {
        $validate = $request->validate([
            'requested_document_id' => 'required|exists:requested_documents,requested_document_id',
            'user_id' => 'required|exists:users,user_id',
            'admin_id' => 'required|exists:admins,admin_id',
            'status_id' => 'required|exists:statuses,status_id',
            'additional_message' => 'nullable|string|max:200',
            'notification' => 'required|string|max:100'
        ]);

        // return \response()->json($validate);

        $processing = collect($validate)->except(['additional_message', 'notification'])->toArray();

        $validate['admin_id'] = \auth('admin')->id();

        DB::transaction(function () use ($validate, $processing) {
            $notification =  Notifications::create($validate);

            Processing::create($processing);
            RequestedDocument::findOrFail($validate['requested_document_id'])
                ->update([
                    'status_id' => $validate['status_id']
                ]);
        });
    }
}
