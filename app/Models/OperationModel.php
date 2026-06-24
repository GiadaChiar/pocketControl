<?php

namespace App\Models;

use PDO;

class OperationModel
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }
    public function insert(array $data, int $userId): ?int
    {


        $query = "
            INSERT INTO transactions (
                user_id,
                category,
                type,
                amount,
                description,
                date
            ) VALUES (
                :user_id,
                :category,
                :type,
                :amount,
                :description,
                :date
            )
        ";

        $stmt = $this->db->prepare($query);
        $stmt->execute([
            ":user_id"     => $userId,
            ":category"    => $data["category"],
            ":type"        => $data["type"],
            ":amount"      => $data["amount"],
            ":description" => $data["description"] ?? null,
            ":date"        => $data["date"]
        ]);

        $idInsert = (int)$this->db->lastInsertId();

        return $idInsert ?: null;
    }



    public function get( int $idUser, ?string $field= null , ?string $value = null){

    $query = "
    SELECT * FROM transactions
    WHERE user_id = :user_id ";

        $params = [
            ":user_id" => $idUser
        ];

    if ($field && $value){
        $query .="AND {$field} = :value";
        $params[":value"] = $value;
    }

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);

        $results= $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }


    public function delete(int $id, int $userId): bool
    {
        $stmt = $this->db->prepare("
        DELETE FROM transactions
        WHERE id = :id AND user_id = :user_id
    ");

        return $stmt->execute([
            ":id" => $id,
            ":user_id" => $userId
        ]);
    }


    public function allCategories():?array{

    $query = "
        SELECT  DISTINCT category 
        FROM transactions";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        
        return $results;
    }



}
