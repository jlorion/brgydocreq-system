<?php

namespace App\Http\Controllers\User\Auth;

use App\Mail\ReferenceNumberMail;
use App\Models\Resident;
use App\Models\ResidentReference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Validation\ValidationException;


class UserResidentReferenceController extends Controller
{


    public function create()
    {
        return Inertia::render('user/auth/ResidentReference');
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
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'required|regex:/^09\d{9}$/',
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

        if (User::where('resident_id', $resident->resident_id)->exists()) {
            throw ValidationException::withMessages([
                'message' => 'This resident already has an account.',
            ]);
        }

        if ($resident->status_id != 3) {

            throw ValidationException::withMessages([
                'message' => 'The resident is inactive. Please contact your Barangay office.',
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
    }
}
