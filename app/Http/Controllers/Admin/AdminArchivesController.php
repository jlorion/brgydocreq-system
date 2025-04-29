<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DocumentArchive;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminArchivesController extends Controller
{
    public function fetchArchives()
    {

        $archives = DocumentArchive::with([
            'admin.barangayOfficer:officer_id,officer_firstname,officer_lastname',
            'requestedDocument.user.resident:resident_id,resident_firstname,resident_lastname',
            'requestedDocument.document:document_id,document_name,price',
            'notification:notification_id,additional_message,notification',
            'status:status_id,status_name'
        ])->get();


        $flattenArchives = $archives->map((function ($archives) {
            return [
                'admin_id' => $archives->admin_id,
                'status_id' => $archives->status_id,
                'created_at' => $archives->created_at,
                'updated_at' => $archives->updated_at,
                'requested_document_id' => $archives->requested_document_id,
                'officer_firstname' => $archives->admin->barangayOfficer->officer_firstname,
                'officer_lastname' => $archives->admin->barangayOfficer->officer_lastname,
                'resident_firstname' => $archives->requestedDocument->user->resident->resident_firstname,
                'resident_lastname' => $archives->requestedDocument->user->resident->resident_lastname,
                'document_name' => $archives->requestedDocument->document->document_name,
                'amount' => $archives->requestedDocument->document->price,
                'attachment_path' => $archives->requestedDocument->attachment_path,
                'additional_message' => $archives->notification->additional_message,
                'notification' => $archives->notification->notification,
                'requested_purpose' => $archives->requestedDocument->requested_purpose,
                'status_name' => $archives->status->status_name,
            ];
        }));

        // return \response()->json($flattenArchives);


        return  Inertia::render('admin/Archives', [
            'docprocessing' => $flattenArchives
        ]);
    }
}
