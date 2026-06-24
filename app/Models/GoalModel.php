<?php

namespace App\Models;

use PDO;

class GoalModel{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function get( int $idUser){

    $query = "
    SELECT * FROM goals
    WHERE user_id = :user_id ";

        $params = [
            ":user_id" => $idUser
        ];

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);

        $results= $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }


    public function insert(array $data, int $userId): ?int
    {
        


        $query = "
            INSERT INTO goals(
                user_id,
                date,
                target_amount,
                current_amount,
                description
            ) VALUES (
                :user_id,
                :date,
                :target_amount,
                :current_amount,
                :description
            )
        ";

        $stmt = $this->db->prepare($query);
        $stmt->execute([
            ":user_id"     => $userId,
            ":date"    => $data["date"],
            ":target_amount"        => $data["target_amount"],
            ":current_amount"      => $data["current_amount"],
            ":description" => $data["description"] ?? null,
        ]);

        $idInsert = (int)$this->db->lastInsertId();


        return $idInsert ?: null;
    }


    public function delete(int $id, int $userId): bool
    {
        $stmt = $this->db->prepare("
        DELETE FROM goals
        WHERE id = :id AND user_id = :user_id
    ");

        return $stmt->execute([
            ":id" => $id,
            ":user_id" => $userId
        ]);
    }
}