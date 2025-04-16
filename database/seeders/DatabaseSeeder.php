<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AddressSeeder::class,
            StatusSeeder::class,
            BarangayOfficerSeeder::class,
            ResidentSeeder::class,
            RoleSeeder::class
        ]);
    }
}
