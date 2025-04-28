<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Processing extends Model
{

    protected $primaryKey = 'onprocess_id';

    protected $fillable = [
        'requested_document_id',
        'admin_id',
        'status_id',
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
}
