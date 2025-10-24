<?php

namespace Modules\Designation\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Designation\Models\Designation;
use Modules\Department\Models\Department;

class DesignationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get existing departments or create them if they don't exist
        $departments = Department::all();

        if ($departments->isEmpty()) {
            $this->command->warn('No departments found. Please seed departments first.');
            return;
        }

        // Create specific designations for each department
        foreach ($departments->take(5) as $department) {
            Designation::create([
                'name' => 'Manager',
                'department_id' => $department->id,
                'description' => 'Department manager responsible for team leadership',
                'status' => 'active'
            ]);

            Designation::create([
                'name' => 'Senior Executive',
                'department_id' => $department->id,
                'description' => 'Senior level executive with extensive experience',
                'status' => 'active'
            ]);

            Designation::create([
                'name' => 'Executive',
                'department_id' => $department->id,
                'description' => 'Mid-level executive position',
                'status' => 'active'
            ]);
        }

        // Create random designations using factory
        Designation::factory()->count(20)->create();
    }
}
