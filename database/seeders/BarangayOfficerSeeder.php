<?php

namespace Database\Seeders;

use App\Models\BarangayOfficer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangayOfficerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       BarangayOfficer::factory()->count(50)->create();
    }
}
