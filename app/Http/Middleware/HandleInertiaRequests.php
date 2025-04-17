<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $admin = $request->user('admin');
        $user = $request->user('web');


        if ($admin) {
            $admin->load('role');
        }

        if ($user) {
            $user->load('resident');
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user ? [
                    'user_id' => $user->user_id,
                    'username' => $user->username,
                    'user_email' => $user->user_email,
                    'user_firstname' => $user->resident->resident_firstname,
                    'user_photopath' => $user->user_photopath
                ] : null,
                'admin' => $admin ? [
                    'admin_id' => $admin->admin_id,
                    'admin_username' => $admin->admin_username,
                    'admin_email' => $admin->admin_email,
                    'admin_role' => $admin->role->role_name,
                    'admin_photopath' => $admin->admin_photopath
                ] : null
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ]
        ];
    }
}
