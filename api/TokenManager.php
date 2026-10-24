<?php
 declare(strict_types=1);
class TokenManager
{
    public function generate(int $userId): string
    {
        $payload = base64_encode(json_encode([
            'id' => $userId,
            'exp' => time() + 3600,
        ]));
        $signature = hash_hmac('sha512', $payload, 'abc123');
        return $signature . '.' . $payload;
//      return "{$signature}.{$payload}";
    }

    public function validate(string $token): bool
    {
        $parts = explode('.', $token);
        if (count($parts) !== 2) {
            return false;
        }

        if (!hash_equals($parts[0], hash_hmac('sha512', $parts[1], 'abc123'))) {
            return false;
        }

        $decodedPayload = base64_decode($parts[1]);
        $payload = json_decode($decodedPayload, true);
        return $payload['exp'] > time();
    }

    public function extractId(string $token): ?int
    {
        if($this->validate($token)) {
            $parts = explode('.', $token);
            $decodedPayload = base64_decode($parts[1]);
            $payload = json_decode($decodedPayload, true);
            return $payload['id'];
        }
        return null;
    }
}