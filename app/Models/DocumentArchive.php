<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentArchive extends Model
{
    protected $primaryKey = 'archived_id';

    protected $fillable = [
        'status_id',
        'admin_id',
        'requested_document_id',
        'notification_id',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id', 'admin_id');
    }

    public function requestedDocument()
    {
        return $this->belongsTo(RequestedDocument::class, 'requested_document_id', 'requested_document_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id', 'status_id');
    }

    public function notification()
    {
        return $this->belongsTo(Notifications::class, 'notification_id', 'notification_id');
    }
}
