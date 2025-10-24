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
    
    // Apps Management
    Route::resource('apps', AppController::class);
    Route::get('/apps/kanban', [AppController::class, 'kanban'])->name('apps.kanban');
    Route::get('/apps/calendar', [AppController::class, 'calendar'])->name('apps.calendar');
    Route::get('/apps/mail', [AppController::class, 'mail'])->name('apps.mail');
    
    // Chats
    Route::get('/chats', [ChatController::class, 'index'])->name('chats.index');
    Route::get('/chats/{chat}', [ChatController::class, 'show'])->name('chats.show');
    Route::post('/chats/{chat}/messages', [ChatController::class, 'sendMessage'])->name('chats.messages.store');
    
    // Settings
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::get('/settings/profile', [SettingController::class, 'profile'])->name('settings.profile');
    Route::get('/settings/account', [SettingController::class, 'account'])->name('settings.account');
    Route::get('/settings/appearance', [SettingController::class, 'appearance'])->name('settings.appearance');
    Route::get('/settings/notifications', [SettingController::class, 'notifications'])->name('settings.notifications');
    Route::get('/settings/display', [SettingController::class, 'display'])->name('settings.display');
    Route::patch('/settings/profile', [SettingController::class, 'updateProfile'])->name('settings.profile.update');
    Route::patch('/settings/account', [SettingController::class, 'updateAccount'])->name('settings.account.update');
    
    // Help Center
    Route::get('/help-center', [HelpCenterController::class, 'index'])->name('help-center.index');
    Route::get('/help-center/overview', [HelpCenterController::class, 'overview'])->name('help-center.overview');
    Route::get('/help-center/support', [HelpCenterController::class, 'support'])->name('help-center.support');
    
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
