<?php

use App\Http\Controllers\MunicipalityController;
use Illuminate\Support\Facades\Route;

Route::resource('municipalities', MunicipalityController::class)->middleware(['auth', 'verified']);
