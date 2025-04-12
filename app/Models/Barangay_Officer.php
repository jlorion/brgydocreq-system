<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barangay_Officer extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'officer_firstname',
        'officer_middlename',
        'officer_lastname',
        'officer_suffix',
        'officer_birthday',
        'officer_gender',
        'officer_position',
        'officer_precinct',
        'address_id',
        'status_id'
    ];

    protected $table = 'barangay_officers';

    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id', 'address_id');
    }
    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id', 'status_id');
}
}
