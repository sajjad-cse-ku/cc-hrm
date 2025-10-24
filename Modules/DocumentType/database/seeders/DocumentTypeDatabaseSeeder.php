<?php

namespace Modules\DocumentType\Database\Seeders;

use Illuminate\Database\Seeder;

class DocumentTypeDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            DocumentTypeSeeder::class,
        ]);
    }
}
