<?php

/**
 * CleanEase Pro API Entry Point
 * PHP Slim Framework 4 Application
 */

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use DI\Container;

require __DIR__ . '/../vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Create Container
$container = new Container();

// Set container to create App with dependency injection
AppFactory::setContainer($container);

// Create App
$app = AppFactory::create();

// Add middleware
$app->addRoutingMiddleware();

// CORS Middleware
$app->add(function (Request $request, $handler) {
    $response = $handler->handle($request);
    
    $allowedOrigins = explode(',', $_ENV['CORS_ALLOWED_ORIGINS'] ?? 'http://localhost:3000');
    $origin = $request->getHeaderLine('Origin');
    
    if (in_array($origin, $allowedOrigins)) {
        $response = $response->withHeader('Access-Control-Allow-Origin', $origin);
    }
    
    return $response
        ->withHeader('Access-Control-Allow-Headers', $_ENV['CORS_ALLOWED_HEADERS'] ?? 'Content-Type,Authorization,X-Requested-With')
        ->withHeader('Access-Control-Allow-Methods', $_ENV['CORS_ALLOWED_METHODS'] ?? 'GET,POST,PUT,DELETE,OPTIONS')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

// Handle preflight requests
$app->options('/{routes:.+}', function (Request $request, Response $response) {
    return $response;
});

// Error handling
$errorMiddleware = $app->addErrorMiddleware(
    $_ENV['APP_DEBUG'] === 'true',
    true,
    true
);

// Basic health check route
$app->get('/health', function (Request $request, Response $response) {
    $data = [
        'status' => 'OK',
        'timestamp' => date('c'),
        'app' => $_ENV['APP_NAME'] ?? 'CleanEase Pro API',
        'version' => '1.0.0',
        'environment' => $_ENV['APP_ENV'] ?? 'production'
    ];
    
    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type', 'application/json');
});

// API Info route
$app->get('/api', function (Request $request, Response $response) {
    $data = [
        'name' => 'CleanEase Pro API',
        'version' => '1.0.0',
        'description' => 'Smart WhatsApp-first CRM and appointment management platform for cleaning companies',
        'endpoints' => [
            'auth' => '/api/auth/*',
            'appointments' => '/api/appointments',
            'customers' => '/api/customers',
            'services' => '/api/services',
            'invoices' => '/api/invoices',
            'inventory' => '/api/inventory',
            'tickets' => '/api/tickets',
            'whatsapp' => '/api/whatsapp/*',
            'pricing' => '/api/pricing/*',
            'chatbot' => '/api/chatbot/*',
            'automation' => '/api/automation',
            'analytics' => '/api/analytics/*',
            'settings' => '/api/settings'
        ],
        'documentation' => '/docs',
        'health' => '/health'
    ];
    
    $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
    return $response->withHeader('Content-Type', 'application/json');
});

// Load route files
$routeFiles = [
    __DIR__ . '/../api/routes/auth.php',
    __DIR__ . '/../api/routes/appointments.php',
    __DIR__ . '/../api/routes/customers.php',
    __DIR__ . '/../api/routes/services.php',
    __DIR__ . '/../api/routes/invoices.php',
    __DIR__ . '/../api/routes/inventory.php',
    __DIR__ . '/../api/routes/tickets.php',
    __DIR__ . '/../api/routes/whatsapp.php',
    __DIR__ . '/../api/routes/pricing.php',
    __DIR__ . '/../api/routes/chatbot.php',
    __DIR__ . '/../api/routes/automation.php',
    __DIR__ . '/../api/routes/analytics.php',
    __DIR__ . '/../api/routes/settings.php'
];

foreach ($routeFiles as $routeFile) {
    if (file_exists($routeFile)) {
        require $routeFile;
    }
}

// 404 handler
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function (Request $request, Response $response) {
    $data = [
        'success' => false,
        'message' => 'Endpoint not found',
        'path' => $request->getUri()->getPath(),
        'method' => $request->getMethod()
    ];
    
    $response->getBody()->write(json_encode($data));
    return $response
        ->withStatus(404)
        ->withHeader('Content-Type', 'application/json');
});

// Run app
$app->run();