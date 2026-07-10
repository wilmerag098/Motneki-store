<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Bypass CSRF entirely by removing it from global middleware for this test
$app->make(\Illuminate\Contracts\Http\Kernel::class);

$req = Illuminate\Http\Request::create('/admin/productos/editar/1', 'POST', [
    'nombre' => 'Test Edit Name',
    'id_categoria' => 5,
    'precio' => '199.99',
    'stock' => 10,
    'activo' => true
]);

// Since we are not using a real browser session, CSRF will fail if we don't mock it
// Actually, let's just test the controller directly!
$controller = new \App\Http\Controllers\Admin\ProductoController();
try {
    $res = $controller->update($req, 1);
    echo "Success! Redirects to: " . $res->headers->get('Location') . "\n";
} catch (\Illuminate\Validation\ValidationException $e) {
    echo "Validation errors:\n";
    print_r($e->errors());
} catch (\Exception $e) {
    echo "Exception: " . $e->getMessage() . "\n";
}
