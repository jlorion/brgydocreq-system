<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\AdminInvitationMail;
use App\Models\AdminInvitation;
use App\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminInvitationController extends Controller
{
    public function sendInvitation(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'email' => 'required|email|unique:admin_invitations,email',
            'role' => 'required|exists:roles,role_id',
        ]);

        $token = Str::random(32);
        $adminInvitation = AdminInvitation::create([
            'email' => $validated['email'],
            'role_id' => $validated['role'],
            'invite_token' => $token,
            'expires_at' => now()->addHours(24),
        ]);

        // Send the invitation email
        $roleName = Role::where('role_id', $validated['role'])->value('role_name');

        Mail::to($validated['email'])->send(new AdminInvitationMail($token, $roleName));

        return response()->json(['message' => 'Invitation sent successfully.']);
    }
}
