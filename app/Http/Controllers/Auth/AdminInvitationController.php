<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\AdminInvitationMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminInvitationController extends Controller
{
    public function sendInvitation(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'role' => 'required|string',
        ]);

        $token = Str::random(32);
        $registrationLink = route('admin.register', ['token' => $token]);

        // Send the invitation email
        Mail::to($validated['email'])->send(new AdminInvitationMail($registrationLink, $validated['role']));

        return response()->json(['message' => 'Invitation sent successfully.']);
    }
}
