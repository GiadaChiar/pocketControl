<?php

namespace App\Models;

use PDO;

class BudgetModel
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    

    public function insert(array $data, int $userId): ?int
    {


        $query = "
            INSERT INTO budgets(
                user_id,
                start_date,
                end_date,
                limit_amount,
                description
            ) VALUES (
                :user_id,
                :start_date,
                :end_date,
                :limit_amount,
                :description
            )
        ";

        $stmt = $this->db->prepare($query);
        $stmt->execute([
            ":user_id"     => $userId,
            ":start_date"    => $data["start_date"],
            ":end_date"    => $data["end_date"],
            ":limit_amount"        => $data["limit_amount"],
            ":description" => $data["description"] ?? null,
        ]);

        $idInsert = (int)$this->db->lastInsertId();

        return $idInsert ?: null;
    }


    public function get(int $idUser, array $data)
    {

        $query = "
    SELECT * FROM budgets
    WHERE user_id = :user_id ";

        $params = [
            ":user_id" => $idUser
        ];

        if (
            !empty($data['start_date']) &&
            !empty($data['end_date'])
        ) {
            $query .= "
            AND start_date >= :start_date AND end_date <= :end_date
        ";


            $params[':start_date'] = $data['start_date'];
            $params[':end_date'] = $data['end_date'];
        }


        $query .= "ORDER BY start_date ASC";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }




    public function delete(int $id, int $userId): bool
    {
        $stmt = $this->db->prepare("
        DELETE FROM budgets
        WHERE id = :id AND user_id = :user_id
    ");

        return $stmt->execute([
            ":id" => $id,
            ":user_id" => $userId
        ]);
    }
}
