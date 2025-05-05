<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Notifications;
use App\Models\RequestedDocument;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserDocumentRequestController extends Controller
{
    public function storeDocRequest(Request $request)
    {
        $validate = $request->validate([
            'document_id' => 'exists:documents,document_id',
            'user_id' => 'exists:users,user_id',
            'requested_purpose' => 'required|string|max:255',
            'document_name' => 'required|string|max:100',
            'attachment_path' => 'required|file|mimes:jpg,png,jpeg|max:2048'
        ]);

        $validate['user_id'] = \auth('web')->id();


        if ($request->hasFile('attachment_path')) {
            $validate['attachment_path'] = $request->file('attachment_path')->store('user/attachments', 'public');
        }


        // return response()->json($name->resident->resident_firstname);

        DB::transaction(function () use ($validate) {
            $requestedDocId =  RequestedDocument::create($validate);

            $name = User::with('resident:resident_id,resident_firstname,resident_lastname')
                ->where('user_id', $validate['user_id'])
                ->firstOrFail();

            Notifications::create([
                'requested_document_id' => $requestedDocId->getKey(),
                'notification' => "{$name->resident->resident_firstname}, {$name->resident->resident_lastname} requested a {$validate['document_name']}.",
                'status_id' => 5,
            ]);
        });
    }
}
