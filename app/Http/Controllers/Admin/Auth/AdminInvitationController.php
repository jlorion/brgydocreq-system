<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Mail\AdminInvitationMail;
use App\Models\Admin;
use App\Models\AdminInvitation;
use App\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminInvitationController extends Controller
{
    public function sendInvitation(Request $request)
    {
        // Validate the request
        $validate = $request->validate([
            'email' => 'required|email',
            'role_id' => 'required|exists:roles,role_id',
        ]);

        if (Admin::whereEmail($validate['email'])->exists()) {
            throw ValidationException::withMessages([
                'message' => 'This Barangay Officer already has an account.'
            ]);
        }

        $token = Str::random(50);

        AdminInvitation::create([
            'email' => $validate['email'],
            'role_id' => $validate['role_id'],
            'invite_token' => Hash::make($token),
            'expires_at' => now()->addHours(24),
        ]);

        $roleName = Role::where('role_id', $validate['role_id'])->value('role_name');

        $url = URL::signedRoute('register', [
            'invite_token' => $token,
            'email' => $validate['email'],
            'role_name' => $roleName,
        ]);


        Mail::to($validate['email'])->send(new AdminInvitationMail($url, $roleName));

        // return response()->json(['message' => 'Invitation sent successfully.', 'token' => $token]);
    }

    public function show(Request $request)
    {

        if (! $request->hasValidSignature()) {
            abort(403, 'Invalid or expired invitation link.');
        }

        $invitation = AdminInvitation::where('email', $request->email)->latest('created_at')->first();

        if (
            !$invitation ||
            !Hash::check($request->invite_token, $invitation->invite_token) ||
            $invitation->expires_at <= now() ||
            $invitation->used
        ) {
            \abort(403, 'Invalid or expired invitation token.');
        }

        return Inertia::render('admin/auth/Register', [
            'invite_token' => $request->query('invite_token'),
            'email' => $request->query('email'),
            'role_name' => $request->query('role_name'),
        ]);
    }
}
