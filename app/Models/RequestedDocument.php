<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestedDocument extends Model
{
    protected $primaryKey = 'requested_document_id';

    protected $table = 'requested_documents';

    protected $fillable = [
        'document_id',
        'user_id',
        'requested_purpose',
        'attachment_path',
        'status_id'
    ];

    public function document()
    {
        return   $this->belongsTo(Document::class, 'document_id', 'document_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id', 'status_id');
    }

    public function latestNotification()
    {
        return $this->hasOne(Notifications::class, 'requested_document_id', 'requested_document_id')
            ->latestOfMany('updated_at');
    }
}
