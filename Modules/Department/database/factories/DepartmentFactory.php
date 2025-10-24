<?php

namespace Modules\Department\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Department\Models\Department;
use Modules\Branch\Models\Branch;

class DepartmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Department::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Human Resources',
                'Sales',
                'Marketing',
                'Finance',
                'IT Support',
                'Customer Service',
                'Operations',
                'Research & Development',
                'Legal',
                'Administration'
            ]),
            'branch_id' => Branch::factory(),
            'description' => $this->faker->paragraph(2),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the department is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the department is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}
