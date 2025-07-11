<?php

use App\Http\Controllers\BarangayController;
use Illuminate\Support\Facades\Route;

Route::resource('barangays', BarangayController::class)->middleware(['auth', 'verified']);
