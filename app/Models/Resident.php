<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'resident_firstname',
        'resident_middlename',
        'resident_lastname',
        'resident_suffix',
        'resident_birthdate',
        'resident_gender',
        'resident_precinct',
        'address_id',
        'status_id'
    ];


    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id', 'address_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id', 'status_id');
    }
}
