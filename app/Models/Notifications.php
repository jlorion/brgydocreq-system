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
        'content'
    ];
}
