<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = [
        'officer_id',
        'role_id',
        'admin_username',
        'admin_phonenum',
        'admin_email',
        'admin_password',
        'admin_photopath'
    ];
}
