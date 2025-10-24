<?php

use Illuminate\Support\Facades\Route;
use Modules\Designation\Http\Controllers\DesignationController;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('designations', DesignationController::class);
});
