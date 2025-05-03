<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Resident;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminResidentsController extends Controller
{
    public function fetchResidentInfo()
    {
        $residents = Resident::with(['address:address_id,purok', 'status:status_id,status_name'])->latest()->get();

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
                'resident_statusid' => $resident->status->status_id,
                'resident_purok' => $resident->address->purok,
                'resident_purokid' => $resident->address->address_id,
            ];
        });

        // return \response()->json($flattenResidents);

        $puroks = Address::get(['address_id', 'purok']);
        $status = Status::select(['status_id', 'status_name'])
            ->whereIn('status_name', ['Active', 'Migrated', 'Deceased', 'Blacklisted'])
            ->get();

        return  Inertia::render('admin/Residents', [
            'residents' => $flattenResidents,
            'puroks' => $puroks,
            'status' => $status
        ]);
    }

    public function updateResidentInfo(Request $request)
    {

        $validate = $request->validate([
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
            'resident_purokid' => 'required|exists:addresses,address_id',
            'resident_statusid' => 'required|exists:statuses,status_id',
        ]);

        $resident = Resident::findOrFail($validate['resident_id']);

        $resident->update([
            'resident_firstname' => $validate['resident_firstname'],
            'resident_middlename' => $validate['resident_middlename'],
            'resident_lastname' => $validate['resident_lastname'],
            'resident_suffix' => $validate['resident_suffix'],
            'resident_birthdate' => $validate['resident_birthdate'],
            'resident_gender' => $validate['resident_gender'],
            'resident_precinct' => $validate['resident_precinct'],
            'resident_householdnum' => $validate['resident_householdnum'],
            'address_id' => $validate['resident_purokid'],
            'status_id' => $validate['resident_statusid'],

        ]);
    }

    public function storeResidentInfo(Request $request)
    {

        $validate = $request->validate([
            'resident_firstname' => 'required|string|max:255',
            'resident_middlename' => 'required|string|max:255',
            'resident_lastname' => 'required|string|max:255',
            'resident_suffix' => 'nullable|string|max:255',
            'resident_birthdate' => 'required|date',
            'resident_gender' => 'required|string|max:255',
            'resident_precinct' => 'required|string|max:255',
            'resident_householdnum' => 'required|string|max:255',
            'resident_purokid' => 'required|exists:addresses,address_id',
        ]);

        Resident::create([
            'resident_firstname' => $validate['resident_firstname'],
            'resident_middlename' => $validate['resident_middlename'],
            'resident_lastname' => $validate['resident_lastname'],
            'resident_suffix' => $validate['resident_suffix'],
            'resident_birthdate' => $validate['resident_birthdate'],
            'resident_gender' => $validate['resident_gender'],
            'resident_precinct' => $validate['resident_precinct'],
            'resident_householdnum' => $validate['resident_householdnum'],
            'address_id' => $validate['resident_purokid'],
        ]);
    }
}
