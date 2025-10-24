<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Nwidart\Modules\Facades\Module;

class SeedAllModules extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'modules:seed-all {--fresh : Drop all tables and re-run all migrations before seeding}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed all modules in the application';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Check if --fresh flag is set
        if ($this->option('fresh')) {
            $this->info('🔄 Running fresh migrations...');
            $this->call('migrate:fresh');
            $this->newLine();
        }

        $this->info('🌱 Starting to seed all modules...');
        $this->newLine();

        $modules = Module::allEnabled();
        
        if (empty($modules)) {
            $this->warn('⚠️  No enabled modules found!');
            return 0;
        }

        $seededCount = 0;
        $failedModules = [];

        foreach ($modules as $module) {
            $moduleName = $module->getName();
            $seederClass = "Modules\\{$moduleName}\\Database\\Seeders\\{$moduleName}DatabaseSeeder";

            $this->info("📦 Seeding module: {$moduleName}");

            try {
                if (class_exists($seederClass)) {
                    $this->call('module:seed', ['module' => $moduleName]);
                    $seededCount++;
                    $this->line("   ✅ {$moduleName} seeded successfully");
                } else {
                    $this->line("   ⏭️  No seeder found for {$moduleName}");
                }
            } catch (\Exception $e) {
                $failedModules[] = $moduleName;
                $this->error("   ❌ Failed to seed {$moduleName}: " . $e->getMessage());
            }

            $this->newLine();
        }

        // Summary
        $this->newLine();
        $this->info('📊 Seeding Summary:');
        $this->info("   Total modules: " . count($modules));
        $this->info("   Successfully seeded: {$seededCount}");
        
        if (!empty($failedModules)) {
            $this->error("   Failed: " . count($failedModules));
            $this->error("   Failed modules: " . implode(', ', $failedModules));
        }

        $this->newLine();
        $this->info('✨ All modules seeding completed!');

        return 0;
    }
}
