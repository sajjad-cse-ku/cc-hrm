<?php

namespace Modules\Branch\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Branch\Models\Branch;

class BranchFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Branch::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $cities = [
            ['New York', 'NY', 'USA', '10001'],
            ['Los Angeles', 'CA', 'USA', '90210'],
            ['Chicago', 'IL', 'USA', '60601'],
            ['Houston', 'TX', 'USA', '77001'],
            ['Toronto', 'ON', 'Canada', 'M5V 3A8'],
            ['Vancouver', 'BC', 'Canada', 'V6B 1A1'],
            ['London', 'England', 'UK', 'SW1A 1AA'],
            ['Sydney', 'NSW', 'Australia', '2000'],
        ];

        $cityData = $this->faker->randomElement($cities);
        $branchTypes = ['Main', 'Downtown', 'North', 'South', 'East', 'West', 'Central', 'Express'];

        return [
            'branch_name' => $this->faker->randomElement($branchTypes) . ' ' . $cityData[0] . ' Branch',
            'address' => $this->faker->streetAddress(),
            'city' => $cityData[0],
            'state' => $cityData[1],
            'country' => $cityData[2],
            'zip_code' => $cityData[3],
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the branch is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the branch is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}

