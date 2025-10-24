<?php

namespace Modules\DocumentType\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\DocumentType\Models\DocumentType;

class DocumentTypeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = DocumentType::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'Passport',
                'National ID',
                'Driver License',
                'Birth Certificate',
                'Tax ID',
                'Social Security Card',
                'Resume/CV',
                'Employment Contract',
                'Bank Statement',
                'Proof of Address',
                'Educational Certificate',
                'Medical Certificate',
                'Police Clearance',
                'Reference Letter',
                'Insurance Policy'
            ]),
            'description' => $this->faker->sentence(10),
            'required' => $this->faker->randomElement(['required', 'optional']),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the document type is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the document type is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }

    /**
     * Indicate that the document type is required.
     */
    public function required(): static
    {
        return $this->state(fn (array $attributes) => [
            'required' => 'required',
        ]);
    }

    /**
     * Indicate that the document type is optional.
     */
    public function optional(): static
    {
        return $this->state(fn (array $attributes) => [
            'required' => 'optional',
        ]);
    }
}
