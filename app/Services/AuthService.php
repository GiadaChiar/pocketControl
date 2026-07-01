<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService
{
    public function getUserIdFromRequest(): int
    {
        $headers = getallheaders();

        $authHeader = $headers['Authorization'] ?? null;

        if (!$authHeader) {
            throw new \Exception("Token mancante", 401);
        }

        $token = str_replace('Bearer ', '', $authHeader);

        $decoded = JWT::decode(
            $token,
            new Key($_ENV['JWT_SECRET'], 'HS256')
        );

        return $decoded->user_id;
    }
}