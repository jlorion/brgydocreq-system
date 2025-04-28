<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Processing;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminOnProcessController extends Controller
{
    public function fetchOnProcess()
    {

        $onProcesses =  Processing::with([
            'admin.barangayOfficer:officer_id,officer_firstname,officer_middlename,officer_lastname,officer_suffix',
            'requestedDocument.user.resident:resident_id,resident_firstname,resident_middlename,resident_lastname,resident_suffix',
            'requestedDocument.document:document_id,document_name',
            'status:status_id,status_name'
        ])->get();

        $status = Status::select('status_id', 'status_name')
            ->whereIn('status_name', ['Processing', 'Claimed', 'For Pickup', 'Approved'])
            ->get();

        $flattenOnProcess = $onProcesses->map(function ($onProcess) {
            return [
                'onprocess_id' => $onProcess->onprocess_id,
                'admin_id' => $onProcess->admin_id,
                'status_id' => $onProcess->status_id,
                'created_at' => $onProcess->created_at,
                'updated_at' => $onProcess->updated_at,
                'requested_document_id' => $onProcess->requested_document_id,
                'officer_firstname' => $onProcess->admin->barangayOfficer->officer_firstname,
                'officer_middlename' => $onProcess->admin->barangayOfficer->officer_middlename,
                'officer_lastname' => $onProcess->admin->barangayOfficer->officer_lastname,
                'officer_suffix' => $onProcess->admin->barangayOfficer->officer_suffix,
                'resident_firstname' => $onProcess->requestedDocument->user->resident->resident_firstname,
                'resident_middlename' => $onProcess->requestedDocument->user->resident->resident_middlename,
                'resident_lastname' => $onProcess->requestedDocument->user->resident->resident_lastname,
                'resident_suffix' => $onProcess->requestedDocument->user->resident->resident_suffix,
                'document_name' => $onProcess->requestedDocument->document->document_name,
                'status_name' => $onProcess->status->status_name,
            ];
        });

        // return \response()->json($status);

        return Inertia::render('admin/OnProcess', [
            'onprocess' => $flattenOnProcess,
            'status' => $status
        ]);
    }

    public function updateOnProcess(Request $request)
    {

        $validate = $request->validate([
            'onprocess_id' => 'required|exists:processings,onprocess_id',
            'status_id' => 'required|exists:statuses,status_id',
        ]);

        DB::transaction(function () use ($validate) {
            Processing::findOrFail($validate['onprocess_id'])->update($validate);
        });
    }
}
