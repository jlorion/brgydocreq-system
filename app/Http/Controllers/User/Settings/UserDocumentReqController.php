<?php

namespace App\Http\Controllers\User\Settings;

use App\Http\Controllers\Controller;
use App\Models\DocumentArchive;
use App\Models\Notifications;
use App\Models\RequestedDocument;
use App\Models\User;
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
        ])->latest('updated_at')->get();


        $latestStatus = DB::table('notifications as n1')
            ->select('status_id', 'requested_document_id', 'additional_message')
            ->whereRaw('created_at = (
        SELECT MAX(created_at)
        FROM notifications as n2
        WHERE n1.requested_document_id = n2.requested_document_id
        )');

        $docTracking = collect($latestStatus->get())->keyBy('requested_document_id');


        $flattenDocRequest = $docRequests->map((function ($docRequest) use ($docTracking) {
            $status = $docTracking[$docRequest->requested_document_id]->status_id ?? 5;
            $additional_message = $docTracking[$docRequest->requested_document_id]->additional_message ?? null;

            return [
                'requested_document_id' => $docRequest->requested_document_id,
                'user_id' => $docRequest->user_id,
                'status_name' => $docRequest->status->status_name,
                'additional_message' => $additional_message,
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

    public function resubmitDocReq(Request $request)
    {
        $validate = $request->validate([
            'document_id' => 'exists:documents,document_id',
            'user_id' => 'exists:users,user_id',
            'requested_document_id' => 'exists:requested_documents,requested_document_id',
            'status_id' => 'exists:statuses,status_id',
            'requested_purpose' => 'required|string|max:255',
            'document_name' => 'required|string|max:100',
            'attachment_path' => 'required|file|mimes:jpg,png,jpeg|max:2048'
        ]);

        $validate['user_id'] = \auth('web')->id();


        if ($request->hasFile('attachment_path')) {
            $validate['attachment_path'] = $request->file('attachment_path')->store('user/attachments', 'public');
        }


        // return response()->json($name->resident->resident_firstname);

        DB::transaction(function () use ($validate) {
            RequestedDocument::findOrFail($validate['requested_document_id'])
                ->update($validate);

            DocumentArchive::where('requested_document_id', $validate['requested_document_id'])
                ->delete();

            $name = User::with('resident:resident_id,resident_firstname,resident_lastname')
                ->where('user_id', $validate['user_id'])
                ->firstOrFail();

            Notifications::create([
                'requested_document_id' => $validate['requested_document_id'],
                'notification' => "{$name->resident->resident_firstname}, {$name->resident->resident_lastname} resubmitted the {$validate['document_name']}.",
                'status_id' => 5,
            ]);
        });
    }
}
