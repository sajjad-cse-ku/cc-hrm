<?php

namespace Modules\Department\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Department\Models\Department;
use Modules\Branch\Models\Branch;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get existing branches or create them if they don't exist
        $branches = Branch::all();

        if ($branches->isEmpty()) {
            $this->command->warn('No branches found. Please seed branches first.');
            return;
        }

        // Create specific departments for each branch
        foreach ($branches->take(3) as $branch) {
            Department::create([
                'name' => 'Human Resources',
                'branch_id' => $branch->id,
                'description' => 'Manages employee relations, recruitment, and HR policies',
                'status' => 'active'
            ]);

            Department::create([
                'name' => 'IT Department',
                'branch_id' => $branch->id,
                'description' => 'Handles technology infrastructure and support',
                'status' => 'active'
            ]);

            Department::create([
                'name' => 'Finance',
                'branch_id' => $branch->id,
                'description' => 'Manages financial operations and accounting',
                'status' => 'active'
            ]);
        }

        // Create random departments using factory
        Department::factory()->count(15)->create();
    }
}
