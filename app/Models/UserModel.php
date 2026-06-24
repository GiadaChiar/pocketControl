<?php

namespace App\Models;

use PDO;

class UserModel
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function findByField(string $field, string|int $value): ?array
    {
        $allowedFields = ['id', 'email'];

        if (!in_array($field, $allowedFields, true)) {
            throw new \InvalidArgumentException("Campo della richiesta errato");
        }
        $query = "
        SELECT id, name, email, password
        FROM users 
        WHERE {$field} = :value LIMIT 1";


        $stmt = $this->db->prepare($query);


        $stmt->bindParam(":value", $value);


        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);



        return $result ?: null;;
    }


    public function insert(array $data): ?int
    {


        $columns = implode(', ', array_keys($data));

        $placeholders = ':' . implode(', :', array_keys($data));


        $query = "INSERT INTO users ({$columns})VALUES({$placeholders})";

        $stmt = $this->db->prepare($query);
        $stmt->execute($data);


        $idInsert = (int)$this->db->lastInsertId();

        return $idInsert ?: null;
    }
}
