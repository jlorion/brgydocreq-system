<?php

namespace App\Http\Middleware;

use App\Models\Notifications;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class AdminNotifications
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
                if (Auth::guard('admin')->check()) {

                    return  Notifications::with([
                        'status:status_id,status_name',
                        'requestedDocument.user:user_id'
                    ])
                        ->where('status_id', 5)
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
                }
            }
        ]);

        return $next($request);
    }
}
