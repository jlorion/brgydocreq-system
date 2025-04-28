<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Processing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOnProcessController extends Controller
{
    public function fetchOnProcess()
    {

        $onProcess =  Processing::with([
            'admin.barangayOfficer:officer_id,officer_firstname,officer_middlename,officer_lastname,officer_suffix',
            'requestedDocument.user.resident:resident_id,resident_firstname,resident_middlename,resident_lastname,resident_suffix',
            'status:status_id,status_name'
        ])->get();

        return \response()->json($onProcess);

        return Inertia::render('admin/OnProcess');
    }
}
