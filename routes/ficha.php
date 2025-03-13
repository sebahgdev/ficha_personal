<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FichasController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::prefix('ficha')->group(function () {
    Route::post('', [FichasController::class, 'store']);
   /*  Route::get('/all', [FichasController::class, 'index']); */
    Route::get('', [FichasController::class, 'index'])->name('fichas.index');
});