<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    protected $primaryKey = 'notification_id';

    protected $fillable = [
        'requested_document_id',
        'admin_id',
        'status_id',
        'additional_message',
        'notification',
        'updated_at',
        'created_at'
    ];

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id', 'status_id');
    }
}
