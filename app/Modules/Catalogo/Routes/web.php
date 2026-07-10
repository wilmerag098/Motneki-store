<?php

use App\Modules\Catalogo\Controllers\ProductoController;
use Illuminate\Support\Facades\Route;

Route::get('/catalogo', [ProductoController::class, 'index'])->name('catalogo.index');
