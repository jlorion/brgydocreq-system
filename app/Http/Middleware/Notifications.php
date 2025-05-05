<?php

namespace App\Http\Middleware;

use App\Models\Notifications as ModelsNotifications;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class Notifications
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        Inertia::share([
            'notifications' => function () {
                if (Auth::guard('web')->check()) {

                    $user = Auth::guard('web')->id();

                    return ModelsNotifications::with([
                        'status:status_id,status_name',
                        'requestedDocument.user:user_id'
                    ])
                        ->whereHas('requestedDocument.user', function ($query) use ($user) {
                            $query->where('user_id', $user);
                        })
                        ->latest()
                        ->get()
                        ->map(function ($notification) {
                            return [
                                'notification_id' => $notification->notification_id,
                                'status_id' => $notification->status->status_id,
                                'status_name' => $notification->status->status_name,
                                'notification' => $notification->notification,
                                'additional_message' => $notification->additional_message,
                                'updated_at' => $notification->updated_at,
                            ];
                        });
                } elseif (Auth::guard('admin')->check()) {
                    // Add admin-specific notification logic here if needed
                    return []; // Or fetch admin-specific notifications
                }

                return [];
            },
        ]);

        return $next($request);
    }
}
