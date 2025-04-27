<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['Rejected', 'Claimed', 'Active', 'Inactive', 'Under Review', 'Processing', 'For Pickup', 'Available', 'Cancelled', 'Suspended', 'Approved', 'Suspend', 'Revoke', 'Ban', 'Term ended', 'Resigned', 'Migrated', 'Deceased', 'Blacklisted'];
        foreach ($statuses as $status) {
            Status::create([
                'status_name' => $status
            ]);
        }
    }
}
