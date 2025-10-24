<?php

namespace Modules\Branch\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Branch\Models\Branch;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample branches
        $branches = [
            [
                'branch_name' => 'Main Branch',
                'address' => '123 Main Street',
                'city' => 'New York',
                'state' => 'NY',
                'country' => 'USA',
                'zip_code' => '10001',
                'status' => 'active'
            ],
            [
                'branch_name' => 'Downtown Branch',
                'address' => '456 Downtown Ave',
                'city' => 'Los Angeles',
                'state' => 'CA',
                'country' => 'USA',
                'zip_code' => '90210',
                'status' => 'active'
            ],
            [
                'branch_name' => 'North Branch',
                'address' => '789 North Road',
                'city' => 'Chicago',
                'state' => 'IL',
                'country' => 'USA',
                'zip_code' => '60601',
                'status' => 'active'
            ],
            [
                'branch_name' => 'Toronto Central',
                'address' => '100 Queen Street West',
                'city' => 'Toronto',
                'state' => 'ON',
                'country' => 'Canada',
                'zip_code' => 'M5H 2N2',
                'status' => 'active'
            ],
            [
                'branch_name' => 'London Office',
                'address' => '25 Old Broad Street',
                'city' => 'London',
                'state' => 'England',
                'country' => 'UK',
                'zip_code' => 'EC2N 1HQ',
                'status' => 'inactive'
            ]
        ];

        foreach ($branches as $branchData) {
            Branch::create($branchData);
        }

        // Create additional random branches using factory
        Branch::factory()->count(10)->create();
        
        // Create some specifically active branches
        Branch::factory()->active()->count(5)->create();
        
        // Create some specifically inactive branches
        Branch::factory()->inactive()->count(2)->create();
    }
}
