<?php

use Illuminate\Support\Facades\Route;
use Modules\DocumentType\Http\Controllers\DocumentTypeController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('documenttypes', DocumentTypeController::class)->names('documenttype');
});
