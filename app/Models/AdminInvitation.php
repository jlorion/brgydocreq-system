<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminInvitation extends Model
{
    protected $fillable = [
        'officer_id',
        'role_id',
        'username',
        'phonenum',
        'email',
        'invite_token',
        'expires_at',
        'used'
    ];

    protected $table = 'admin_invitations';
}
