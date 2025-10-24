<?php

namespace Modules\Designation\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Designation\Models\Designation;
use Modules\Department\Models\Department;

class DesignationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Designation::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Manager',
                'Senior Manager',
                'Team Lead',
                'Software Engineer',
                'Senior Software Engineer',
                'Project Manager',
                'Product Manager',
                'Business Analyst',
                'Quality Assurance Engineer',
                'DevOps Engineer',
                'Data Analyst',
                'UI/UX Designer',
                'Accountant',
                'HR Manager',
                'Sales Executive'
            ]),
            'department_id' => Department::factory(),
            'description' => $this->faker->paragraph(2),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the designation is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the designation is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}
