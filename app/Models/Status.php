<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = [
        'status_name',
    ];

    public function resident()
    {
        return $this->hasMany(Resident::class, 'status_id', 'status_id');
    }
}
