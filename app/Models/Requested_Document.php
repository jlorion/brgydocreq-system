<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Requested_Document extends Model
{
    protected $primaryKey = 'requested_document_id';

    protected $fillable = [
        'document_id',
        'user_id',
        'requested_purpose',
        'attachment_path',
    ];
}
