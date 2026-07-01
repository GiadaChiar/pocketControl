<?php


// Global Cors
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");



if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/../bootstrap.php';

use App\Core\Router;

$router = new Router();

require __DIR__ . '/../routes/api.php';

// clean  URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$router->dispatch($uri, $pdo);
var_dump($_SERVER['REQUEST_URI']);
var_dump($_SERVER['REQUEST_METHOD']);
