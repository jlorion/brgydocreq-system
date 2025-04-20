<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Resident;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminResidentsController extends Controller
{
    public function fetchResidentInfo()
    {
        $residents = Resident::with(['address:address_id,purok', 'status:status_id,status_name'])->get();

        $flattenResidents = $residents->map(function ($resident) {
            return [
                'resident_id' => $resident->resident_id,
                'resident_firstname' => $resident->resident_firstname,
                'resident_middlename' => $resident->resident_middlename,
                'resident_lastname' => $resident->resident_lastname,
                'resident_suffix' => $resident->resident_suffix,
                'resident_birthdate' => $resident->resident_birthdate,
                'resident_gender' => $resident->resident_gender,
                'resident_precinct' => $resident->resident_precinct,
                'resident_householdnum' => $resident->resident_householdnum,
                'resident_status' => $resident->status->status_name,
                'resident_purok' => $resident->address->purok,
            ];
        });


        return  Inertia::render('admin/Residents', [
            'residents' => $flattenResidents
        ]);
    }
}
