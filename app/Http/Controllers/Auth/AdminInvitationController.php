<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\AdminInvitationMail;
use App\Models\AdminInvitation;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminInvitationController extends Controller
{
    public function sendInvitation(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'email' => 'required|email',
            'role' => 'required|string',
        ]);

        $token = Str::random(32);
        $adminInvitation = AdminInvitation::create([
            'email' => $validated['email'],
            'role' => $validated['role'],
            'token' => $token,
            'expires_at' => now()->addHours(24),
        ]);

        // Send the invitation email
        Mail::to($validated['email'])->send(new AdminInvitationMail($token, $validated['role']));

        return response()->json(['message' => 'Invitation sent successfully.']);
    }
}
