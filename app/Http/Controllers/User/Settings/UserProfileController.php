<?php

namespace App\Http\Controllers\User\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class UserProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('user/settings/Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'username' => 'required|unique:users,username,' . $request->user('web')->user_id . ',user_id',
            'user_email' => 'required|email|unique:users,user_email,' . $request->user('web')->user_id . ',user_id',
            'user_photopath' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            'user_phonenum' => ['required', 'regex:/^09\d{9}$/'],
        ]);

        $user = $request->user('web');

        // return response()->json($user);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->update($validate);

        //or  $request->user('web')->fill($validate)->save();

        return to_route('user.settings.profile.edit');
    }

    public function uploadPic(Request $request)
    {
        $validate = $request->validate([
            'user_photopath' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = $request->user('web');

        if ($request->hasFile('user_photopath')) {
            if ($user->user_photopath) {
                Storage::disk('public')->delete($user->user_photopath);
            }

            $file = $request->file('user_photopath');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('user/profile_pic', $filename, 'public');
            $validate['user_photopath'] = $path;
        }

        $user->update($validate);

        //or  $request->user('web')->fill($validate)->save();

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
