<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable

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
