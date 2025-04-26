<?php

namespace App\Http\Controllers\User;

use App\Events\DocRequestSubmitted;
use App\Http\Controllers\Controller;
use App\Models\Requested_Document;
use Illuminate\Http\Request;

class UserDocumentRequestController extends Controller
{
    public function storeDocRequest(Request $request)
    {
        $validate = $request->validate([
            'document_id' => 'required|exists:documents,document_id',
            'user_id' => 'required|exists:users,user_id',
            'requested_purpose' => 'required|string|max:255',
            'attachment_path' => 'required|file|mimes:jpg,png,jpeg|max:2048'
        ]);

        $validate['user_id'] = \auth('web')->id();

        if ($request->hasFile('attachment_path')) {
            $validate['attachment_photo'] = $request->file('attachment_path')->store('user/attachments', 'public');
        }

        $documentRequest = Requested_Document::create($validate);

        \event(new DocRequestSubmitted($documentRequest));
        
    }
}
