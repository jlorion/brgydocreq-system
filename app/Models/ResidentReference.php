<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResidentReference extends Model
{

    protected $primaryKey = 'reference_id';
    
    protected $fillable = [
        'email',
        'phone_number',
        'reference_number',
        'expires_at',
        'used',
        'resident_id',
    ];
}
