<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'province',
        'city',
        'barangay',
        'purok',
    ];

    public function resident()
    {
        return $this->hasMany(Resident::class, 'address_id', 'address_id');
    }
}
