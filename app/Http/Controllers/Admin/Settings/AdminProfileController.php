<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\Address;
use App\Models\Role;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {

        $roles = Role::get(['role_id', 'role_name']);
        $puroks = Address::get(['address_id', 'purok']);

        return Inertia::render('admin/settings/Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'roles' => $roles,
            'puroks' => $puroks
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'admin_username' => 'required|unique:admins,admin_username,' . $request->user('admin')->admin_id . ',admin_id',
            'admin_email' => 'required|email|unique:admins,admin_email,' . $request->user('admin')->admin_id . ',admin_id',
            'admin_phonenum' => ['required', 'regex:/^09\d{9}$/']
        ]);

        $admin = $request->user('admin');

        if ($admin->isDirty('admin_email')) {
            $admin->email_verified_at = null;
        }

        $admin->update($validate);

        return to_route('admin.settings.profile.edit');
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
