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

    public function updateResidentInfo(Request $request)
    {

        $validated = $request->validate([
            'resident_id' => 'required|exists:residents,resident_id',
            'resident_firstname' => 'required|string|max:255',
            'resident_middlename' => 'required|string|max:255',
            'resident_lastname' => 'required|string|max:255',
            'resident_suffix' => 'nullable|string|max:255',
            'resident_birthdate' => 'required|date',
            'resident_gender' => 'required|string|max:255',
            'resident_precinct' => 'required|string|max:255',
            'resident_householdnum' => 'required|string|max:255',
            'resident_status' => 'required|string|max:255',
            'resident_purok' => 'required|string|max:255',
        ]);

        $resident = Resident::findOrFail($validated['resident_id']);

        $resident->update([
            'resident_firstname' => $validated['resident_firstname'],
            'resident_middlename' => $validated['resident_middlename'],
            'resident_lastname' => $validated['resident_lastname'],
            'resident_suffix' => $validated['resident_suffix'],
            'resident_birthdate' => $validated['resident_birthdate'],
            'resident_gender' => $validated['resident_gender'],
            'resident_precinct' => $validated['resident_precinct'],
            'resident_householdnum' => $validated['resident_householdnum'],

        ]);

        $resident->status->update([
            'status_name' => $validated['resident_status'],
        ]);

        $resident->address->update([
            'purok' => $validated['resident_purok']
        ]);

        // dd($resident);
    }
}
