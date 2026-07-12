<?php

use App\Modules\Catalogo\Controllers\ProductoController;
use Illuminate\Support\Facades\Route;

Route::get('/catalogo', [ProductoController::class, 'index'])->name('catalogo.index');
Route::get('/producto/{id}', [ProductoController::class, 'show'])->name('catalogo.show');
