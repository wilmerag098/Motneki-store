<?php

use App\Modules\Pagos\Controllers\PagoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::post('/pedidos/{id}/pagar', [PagoController::class, 'registrarPago'])->name('pedidos.pagar');
});
