<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique()->after('id');
            $table->string('phone_number')->nullable()->after('email');
            $table->enum('status', ['active', 'inactive', 'invited', 'suspended'])->default('active')->after('phone_number');
            $table->enum('role', ['superadmin', 'admin', 'manager', 'cashier'])->default('cashier')->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username', 'phone_number', 'status', 'role']);
        });
    }
};
