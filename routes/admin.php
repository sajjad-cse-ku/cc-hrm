<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\AppController;
use App\Http\Controllers\Admin\ChatController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\HelpCenterController;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
    
    // Users Management
    Route::resource('users', UserController::class);
    Route::get('/users/{user}/profile', [UserController::class, 'profile'])->name('users.profile');
    
    // Tasks Management
    Route::resource('tasks', TaskController::class);
    Route::patch('/tasks/{task}/status', [TaskController::class, 'updateStatus'])->name('tasks.status');
    
   
    // Settings
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::get('/settings/profile', [SettingController::class, 'profile'])->name('settings.profile');
    Route::get('/settings/account', [SettingController::class, 'account'])->name('settings.account');

    
    // Error Pages (for testing)
    Route::get('/errors/403', function () {
        abort(403);
    })->name('errors.403');
    Route::get('/errors/404', function () {
        abort(404);
    })->name('errors.404');
    Route::get('/errors/500', function () {
        abort(500);
    })->name('errors.500');
});
