<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FichasController;
Route::get('/', function () {
    return view('welcome');
});


Route::post('/fichas/store', [FichasController::class, 'store']);