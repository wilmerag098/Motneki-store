<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('welcome');
Route::inertia('/preventas', 'preventas')->name('preventas');
Route::inertia('/exclusivos', 'exclusivos')->name('exclusivos');
Route::inertia('/comunidad', 'comunidad')->name('comunidad');
Route::inertia('/favoritos', 'favoritos')->name('favoritos');
Route::inertia('/carrito', 'carrito')->name('carrito');
Route::inertia('/busqueda', 'busqueda')->name('busqueda');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::middleware(['auth', 'verified'])->group(function () { });
    // NUESTRA RUTA DE ADMIN (Protegida)
    Route::inertia('/admin', 'admin/dashboard')->name('admin.dashboard');
    
    // Rutas de Productos
    Route::get('/admin/productos', [\App\Http\Controllers\Admin\ProductoController::class, 'index'])->name('admin.productos');
    Route::get('/admin/productos/crear', [\App\Http\Controllers\Admin\ProductoController::class, 'create'])->name('admin.productos.crear');
    Route::post('/admin/productos', [\App\Http\Controllers\Admin\ProductoController::class, 'store'])->name('admin.productos.store');
    Route::get('/admin/productos/editar/{id}', [\App\Http\Controllers\Admin\ProductoController::class, 'edit'])->name('admin.productos.editar');
    Route::put('/admin/productos/editar/{id}', [\App\Http\Controllers\Admin\ProductoController::class, 'update'])->name('admin.productos.update');
    Route::delete('/admin/productos/{id}', [\App\Http\Controllers\Admin\ProductoController::class, 'destroy'])->name('admin.productos.destroy');

    // Rutas de Inventario
    Route::get('/admin/inventario', [\App\Http\Controllers\Admin\InventarioController::class, 'index'])->name('admin.inventario');
    Route::put('/admin/inventario/stock/{id}', [\App\Http\Controllers\Admin\InventarioController::class, 'updateStock'])->name('admin.inventario.stock.update');

    // Rutas de Pedidos
    Route::get('/admin/pedidos', [\App\Http\Controllers\Admin\PedidoController::class, 'index'])->name('admin.pedidos');
    Route::get('/admin/pedidos/exportar', [\App\Http\Controllers\Admin\PedidoController::class, 'exportCsv'])->name('admin.pedidos.exportar');

    // Rutas de Pagos
    Route::get('/admin/pagos', [\App\Http\Controllers\Admin\PagoController::class, 'index'])->name('admin.pagos');
    Route::get('/admin/pagos/exportar', [\App\Http\Controllers\Admin\PagoController::class, 'exportCsv'])->name('admin.pagos.exportar');
});

require __DIR__.'/settings.php';

// Cargar dinámicamente las rutas de los módulos en app/Modules
foreach (glob(app_path('Modules/*/Routes/web.php')) as $routeFile) {
    require $routeFile;
}
