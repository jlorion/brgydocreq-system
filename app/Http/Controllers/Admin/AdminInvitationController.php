<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\AdminInvitationMail;
use App\Models\AdminInvitation;
use App\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

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
        AdminInvitation::create([
            'email' => $validated['email'],
            'role_id' => $validated['role'],
            'invite_token' => $token,
            'expires_at' => now()->addHours(24),
        ]);

        $roleName = Role::where('role_id', $validated['role'])->value('role_name');

        Mail::to($validated['email'])->send(new AdminInvitationMail($token, $roleName));

        return response()->json(['message' => 'Invitation sent successfully.', 'token' => $token]);
    }

    public function validateToken(Request $request)
    {
        $token = $request->query('token');

        $invitation = AdminInvitation::with('role')
            ->where('invite_token', $token)
            ->where('expires_at', '>', now())
            ->first();

        if (!$invitation || $invitation->used) {
            \redirect()->route('admin.register');
        }

        return redirect()->route('admin.register');
    }

    public function show()
    {
        $inviteToken = session('invite_token');
        $email = session('email');
        $roleName = session('role_name');

        $invitation = AdminInvitation::with('role')
            ->where('invite_token', $inviteToken)
            ->where('expires_at', '>', now())
            ->first();

        if (!$inviteToken || !$email || !$roleName || $invitation->used || !$invitation) {
            abort(403, 'Invalid or expired invitation token.');
        }

        return Inertia::render('admin/Register', [
            'invite_token' => $inviteToken,
            'email' => $email,
            'role_name' => $roleName,
        ]);
    }
}
