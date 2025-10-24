<?php

use Illuminate\Support\Facades\Route;
use Modules\DocumentType\Http\Controllers\DocumentTypeController;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('document-types', DocumentTypeController::class);
});
