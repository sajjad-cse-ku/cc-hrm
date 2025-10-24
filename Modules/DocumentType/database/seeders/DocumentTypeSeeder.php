<?php

namespace Modules\DocumentType\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\DocumentType\Models\DocumentType;

class DocumentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create specific document types
        $documentTypes = [
            [
                'name' => 'Passport',
                'description' => 'Government-issued passport for international travel',
                'required' => 'required',
                'status' => 'active'
            ],
            [
                'name' => 'National ID',
                'description' => 'National identification card',
                'required' => 'required',
                'status' => 'active'
            ],
            [
                'name' => 'Driver License',
                'description' => 'Valid driver\'s license',
                'required' => 'required',
                'status' => 'active'
            ],
            [
                'name' => 'Birth Certificate',
                'description' => 'Official birth certificate',
                'required' => 'required',
                'status' => 'active'
            ],
            [
                'name' => 'Resume/CV',
                'description' => 'Professional resume or curriculum vitae',
                'required' => 'required',
                'status' => 'active'
            ],
            [
                'name' => 'Educational Certificate',
                'description' => 'Academic degrees and certificates',
                'required' => 'optional',
                'status' => 'active'
            ],
            [
                'name' => 'Bank Statement',
                'description' => 'Recent bank account statements',
                'required' => 'optional',
                'status' => 'active'
            ],
            [
                'name' => 'Reference Letter',
                'description' => 'Professional reference letters',
                'required' => 'optional',
                'status' => 'active'
            ],
            [
                'name' => 'Medical Certificate',
                'description' => 'Medical fitness certificate',
                'required' => 'optional',
                'status' => 'active'
            ],
            [
                'name' => 'Police Clearance',
                'description' => 'Police clearance certificate',
                'required' => 'optional',
                'status' => 'active'
            ]
        ];

        foreach ($documentTypes as $docType) {
            DocumentType::updateOrCreate(
                ['name' => $docType['name']], // Check by name
                $docType // Update or create with these values
            );
        }

        // Don't use factory to avoid duplicate names since we already have specific types
        // DocumentType::factory()->count(5)->create();
    }
}
