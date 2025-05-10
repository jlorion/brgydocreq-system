<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable

{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $primaryKey = 'admin_id';

    protected $fillable = [
        'officer_id',
        'role_id',
        'admin_username',
        'admin_phonenum',
        'email',
        'admin_password',
        'admin_photopath'
    ];


    protected $hidden = [
        'admin_password',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'admin_password' => 'hashed',
        ];
    }

    public function getAuthPassword()
    {
        return $this->admin_password;
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }

    public function barangayOfficer()
    {
        return $this->belongsTo(BarangayOfficer::class, 'officer_id', 'officer_id');
    }
}
