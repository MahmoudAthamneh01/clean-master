<?php

/**
 * Authentication Routes
 * Handles user authentication, registration, and profile management
 */

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;

$app->group('/api/auth', function (RouteCollectorProxy $group) {
    
    // Login endpoint
    $group->post('/login', function (Request $request, Response $response) {
        $data = json_decode($request->getBody(), true);
        
        // Basic validation
        if (empty($data['email']) || empty($data['password'])) {
            $result = [
                'success' => false,
                'message' => 'Email and password are required',
                'errors' => [
                    'email' => empty($data['email']) ? ['Email is required'] : [],
                    'password' => empty($data['password']) ? ['Password is required'] : []
                ]
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response
                ->withStatus(400)
                ->withHeader('Content-Type', 'application/json');
        }
        
        // Mock authentication (replace with actual database logic)
        if ($data['email'] === 'admin@cleanease.pro' && $data['password'] === 'password') {
            // Generate mock JWT token
            $token = base64_encode(json_encode([
                'id' => '550e8400-e29b-41d4-a716-446655440000',
                'email' => 'admin@cleanease.pro',
                'role' => 'admin',
                'exp' => time() + (24 * 60 * 60) // 24 hours
            ]));
            
            $user = [
                'id' => '550e8400-e29b-41d4-a716-446655440000',
                'name' => 'CleanEase Admin',
                'email' => 'admin@cleanease.pro',
                'role' => 'admin',
                'status' => 'active',
                'language' => 'ar',
                'timezone' => 'Asia/Riyadh',
                'created_at' => '2024-01-01T00:00:00Z',
                'updated_at' => '2024-01-01T00:00:00Z'
            ];
            
            $result = [
                'success' => true,
                'data' => [
                    'user' => $user,
                    'token' => $token
                ],
                'message' => 'Login successful'
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response->withHeader('Content-Type', 'application/json');
        }
        
        // Invalid credentials
        $result = [
            'success' => false,
            'message' => 'Invalid credentials'
        ];
        
        $response->getBody()->write(json_encode($result));
        return $response
            ->withStatus(401)
            ->withHeader('Content-Type', 'application/json');
    });
    
    // Get current user profile
    $group->get('/me', function (Request $request, Response $response) {
        // Mock authentication check
        $authHeader = $request->getHeaderLine('Authorization');
        
        if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
            $result = [
                'success' => false,
                'message' => 'Authentication required'
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response
                ->withStatus(401)
                ->withHeader('Content-Type', 'application/json');
        }
        
        // Mock user data
        $user = [
            'id' => '550e8400-e29b-41d4-a716-446655440000',
            'name' => 'CleanEase Admin',
            'email' => 'admin@cleanease.pro',
            'role' => 'admin',
            'status' => 'active',
            'language' => 'ar',
            'timezone' => 'Asia/Riyadh',
            'created_at' => '2024-01-01T00:00:00Z',
            'updated_at' => '2024-01-01T00:00:00Z'
        ];
        
        $result = [
            'success' => true,
            'data' => $user
        ];
        
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    });
    
    // Update user profile
    $group->put('/me', function (Request $request, Response $response) {
        // Mock authentication check
        $authHeader = $request->getHeaderLine('Authorization');
        
        if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
            $result = [
                'success' => false,
                'message' => 'Authentication required'
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response
                ->withStatus(401)
                ->withHeader('Content-Type', 'application/json');
        }
        
        $data = json_decode($request->getBody(), true);
        
        // Mock updated user data
        $user = [
            'id' => '550e8400-e29b-41d4-a716-446655440000',
            'name' => $data['name'] ?? 'CleanEase Admin',
            'email' => 'admin@cleanease.pro',
            'role' => 'admin',
            'status' => 'active',
            'language' => $data['language'] ?? 'ar',
            'timezone' => $data['timezone'] ?? 'Asia/Riyadh',
            'created_at' => '2024-01-01T00:00:00Z',
            'updated_at' => date('c')
        ];
        
        $result = [
            'success' => true,
            'data' => $user,
            'message' => 'Profile updated successfully'
        ];
        
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    });
    
    // Logout endpoint
    $group->post('/logout', function (Request $request, Response $response) {
        $result = [
            'success' => true,
            'message' => 'Logged out successfully'
        ];
        
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    });
    
    // Password change
    $group->put('/change-password', function (Request $request, Response $response) {
        // Mock authentication check
        $authHeader = $request->getHeaderLine('Authorization');
        
        if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
            $result = [
                'success' => false,
                'message' => 'Authentication required'
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response
                ->withStatus(401)
                ->withHeader('Content-Type', 'application/json');
        }
        
        $data = json_decode($request->getBody(), true);
        
        if (empty($data['current_password']) || empty($data['new_password'])) {
            $result = [
                'success' => false,
                'message' => 'Current password and new password are required'
            ];
            
            $response->getBody()->write(json_encode($result));
            return $response
                ->withStatus(400)
                ->withHeader('Content-Type', 'application/json');
        }
        
        $result = [
            'success' => true,
            'message' => 'Password changed successfully'
        ];
        
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    });
});