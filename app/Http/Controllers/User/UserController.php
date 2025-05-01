<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Notifications;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show()
    {
        $documents = Document::all()->each->makeHidden(['created_at', 'updated_at']);

        $notifications = Notifications::with('status:status_id,status_name')->get();

        $flattenNotif = $notifications->map(function($notification) {
            return [
                'status_id' => $notification->status->status_id,
                'status_name' => $notification->status->status_name,      
                'notification' => $notification->notification,     
                'additional_message' => $notification->additional_message,     
                'updated_at' => $notification->updated_at,     
            ];
        });

        // return \response()->json($flattenNotif);
        
        return Inertia::render('landing/Welcome', [
            'documents' => $documents,
            'notifications' => $flattenNotif
        ]);
    }
}
