<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentArchive extends Model
{
    protected $primaryKey = 'archived_id';

    protected $fillable = [
        'status_id',
        'admin_id',
        'requested_document_id'
    ];
}
