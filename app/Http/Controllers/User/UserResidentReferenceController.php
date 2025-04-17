<?php

namespace App\Http\Controllers\User;

use App\Mail\ReferenceNumberMail;
use App\Models\Resident;
use App\Models\ResidentReference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;


class UserResidentReferenceController extends Controller
{


    public function create()
    {
        return Inertia::render('user/ResidentReference');
    }

    public function store(Request $request)
    {

        $validated =  $request->validate([
            'resident_firstname' => 'required|string|max:255',
            'resident_middlename' => 'required|string|max:255',
            'resident_lastname' => 'required|string|max:255',
            'resident_suffix' => 'nullable|string|max:255',
            'resident_householdnum' => 'required|string|max:255',
            'resident_birthdate' => 'required|date',
            'email' => 'required|string|email|max:255',
            'phone_number' => 'required|string|max:255',
        ]);

        $resident = Resident::where([
            ['resident_firstname', $validated['resident_firstname']],
            ['resident_middlename', $validated['resident_middlename']],
            ['resident_lastname', $validated['resident_lastname']],
            ['resident_suffix', $validated['resident_suffix']],
            ['resident_birthdate', $validated['resident_birthdate']],
            ['resident_householdnum', $validated['resident_householdnum']],
        ])->first();


        if (!$resident) {
            throw ValidationException::withMessages([
                'message' => 'Record not found',
            ]);
        }

        $refNumber = rand(100000, 999999);

        ResidentReference::create([
            'email' => $validated['email'],
            'resident_id' => $resident->resident_id,
            'phone_number' => $validated['phone_number'],
            'reference_number' => $refNumber,
            'expires_at' => now()->addMinutes(10),
        ]);

        Mail::to($validated['email'])->send(new ReferenceNumberMail($refNumber));

        return response()->json([
            'message' => 'Reference number successfully sent bitch',
            'reference_number' => $refNumber,
        ], 200);
    }
}
