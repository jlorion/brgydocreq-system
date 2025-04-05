<?php

namespace Database\Seeders;

use App\Models\Barangay_Officer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Barangay_OfficerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Barangay_Officer::factory()->count(50)->create();
    }
}
