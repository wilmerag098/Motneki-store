<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('welcome');
Route::get('/preventas', [\App\Http\Controllers\PreventaController::class, 'index'])->name('preventas');
Route::get('/exclusivos', [\App\Http\Controllers\ExclusivoController::class, 'index'])->name('exclusivos');
Route::get('/comunidad', [\App\Http\Controllers\ComunidadController::class, 'index'])->name('comunidad');
Route::inertia('/favoritos', 'favoritos')->name('favoritos');
Route::inertia('/carrito', 'carrito')->name('carrito');
Route::inertia('/busqueda', 'busqueda')->name('busqueda');
Route::post('/solicitudes-figuras', [\App\Http\Controllers\SolicitudPersonalizadaController::class, 'store'])->name('solicitudes-figuras.store');

Route::post('/newsletter/subscribe', [\App\Http\Controllers\NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\ClientDashboardController::class, 'index'])->name('dashboard');
    Route::middleware(['auth', 'verified'])->group(function () { });

    // Rutas de Direcciones
    Route::post('/direcciones', [\App\Http\Controllers\DireccionController::class, 'store'])->name('direcciones.store');
    Route::put('/direcciones/{id}', [\App\Http\Controllers\DireccionController::class, 'update'])->name('direcciones.update');

    // Rutas de Solicitudes Personalizadas
    Route::post('/solicitudes', [\App\Http\Controllers\SolicitudController::class, 'store'])->name('solicitudes.store');

    // Rutas de Checkout
    Route::get('/checkout', [\App\Http\Controllers\CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [\App\Http\Controllers\CheckoutController::class, 'store'])->name('checkout.store');

    // NUESTRA RUTA DE ADMIN (Protegida)
    Route::get('/admin', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');
    
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

    // Rutas de Solicitudes de Figuras
    Route::get('/admin/solicitudes-figuras', [\App\Http\Controllers\Admin\SolicitudPersonalizadaController::class, 'index'])->name('admin.solicitudes-figuras.index');
    Route::put('/admin/solicitudes-figuras/{id}', [\App\Http\Controllers\Admin\SolicitudPersonalizadaController::class, 'update'])->name('admin.solicitudes-figuras.update');

    // Rutas de Pagos
    Route::get('/admin/pagos', [\App\Http\Controllers\Admin\PagoController::class, 'index'])->name('admin.pagos');
    Route::get('/admin/pagos/exportar', [\App\Http\Controllers\Admin\PagoController::class, 'exportCsv'])->name('admin.pagos.exportar');

    // Rutas de Usuarios
    Route::get('/admin/usuarios', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.usuarios');
    Route::post('/admin/usuarios', [\App\Http\Controllers\Admin\UserController::class, 'store'])->name('admin.usuarios.store');
    Route::put('/admin/usuarios/{id}', [\App\Http\Controllers\Admin\UserController::class, 'update'])->name('admin.usuarios.update');
    Route::delete('/admin/usuarios/{id}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('admin.usuarios.destroy');

    // Rutas de Envíos
    Route::get('/admin/envios', [\App\Http\Controllers\Admin\EnvioController::class, 'index'])->name('admin.envios');
    Route::post('/admin/envios/tracking', [\App\Http\Controllers\Admin\EnvioController::class, 'registrarTracking'])->name('admin.envios.tracking');
    Route::put('/admin/envios/{id}/entregado', [\App\Http\Controllers\Admin\EnvioController::class, 'marcarEntregado'])->name('admin.envios.entregado');

    // Rutas de Reportes
    Route::get('/admin/reportes', [\App\Http\Controllers\Admin\ReporteController::class, 'index'])->name('admin.reportes');
    Route::get('/admin/reportes/exportar', [\App\Http\Controllers\Admin\ReporteController::class, 'exportar'])->name('admin.reportes.exportar');

    // Rutas de Suscripciones (Newsletter)
    Route::get('/admin/suscripciones', [\App\Http\Controllers\Admin\SubscriberController::class, 'index'])->name('admin.suscripciones');
    Route::put('/admin/suscripciones/{id}', [\App\Http\Controllers\Admin\SubscriberController::class, 'update'])->name('admin.suscripciones.update');
    Route::delete('/admin/suscripciones/{id}', [\App\Http\Controllers\Admin\SubscriberController::class, 'destroy'])->name('admin.suscripciones.destroy');

    // Rutas de Configuración
    Route::get('/admin/configuracion', [\App\Http\Controllers\Admin\ConfiguracionController::class, 'index'])->name('admin.configuracion.index');
    Route::post('/admin/configuracion', [\App\Http\Controllers\Admin\ConfiguracionController::class, 'update'])->name('admin.configuracion.update');

    // Rutas del Perfil del Administrador
    Route::get('/admin/perfil', [\App\Http\Controllers\Admin\PerfilController::class, 'index'])->name('admin.perfil.index');
    Route::put('/admin/perfil/info', [\App\Http\Controllers\Admin\PerfilController::class, 'updateInfo'])->name('admin.perfil.info');
    Route::put('/admin/perfil/password', [\App\Http\Controllers\Admin\PerfilController::class, 'updatePassword'])->name('admin.perfil.password');
});

Route::post('/newsletter/subscribe', function () {
    return redirect()->back();
})->name('newsletter.subscribe');

require __DIR__.'/settings.php';

// Cargar dinámicamente las rutas de los módulos en app/Modules
foreach (glob(app_path('Modules/*/Routes/web.php')) as $routeFile) {
    require $routeFile;
}
