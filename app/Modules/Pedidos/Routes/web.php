<?php

use App\Modules\Pedidos\Controllers\CheckoutController;
use Illuminate\Support\Facades\Route;

Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
