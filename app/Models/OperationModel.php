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

    //insert transation
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


    //get specific transations
    public function get( int $idUser,  ?array $date = null, ?string $field= null , ?string $value = null){


    $query = "
    SELECT * FROM transactions
    WHERE user_id = :user_id ";

        $params = [
            ":user_id" => $idUser
        ];


        $allowedFields = ['type', 'category'];

        if ($field && in_array($field, $allowedFields)) {
            $query .= " AND {$field} = :value";
            $params[":value"] = $value;
        }


    if (
        !empty($date['start_date']) &&
        !empty($date['end_date'])
    ) {
        $query .= "
         AND date BETWEEN :start_date AND :end_date
    ";


        $params[':start_date'] = $date['start_date'];
        $params[':end_date'] = $date['end_date'];
        }

        $query .= " ORDER BY date ASC";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);

        $results= $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }


    //delete transation
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

    //get all fields category (dropdown)
    public function allCategories():?array{

    $query = "
        SELECT  DISTINCT category 
        FROM transactions";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        
        return $results;
    }


    //get operations for month by user and range time
    public function getMonthOperation(int $idUser, ?string $start_date=null, ?string $end_date= null){

        $query = "
        SELECT
        YEAR(date) AS year,
        MONTH(date) AS month,
        type,
        SUM(amount) AS total
        FROM pocket.transactions
        WHERE user_id = :user_id
        ";


        $params = [
            ":user_id" => $idUser
        ];

        if(!empty($start_date) && !empty($end_date)){

        $query .= " AND date BETWEEN :start_date AND :end_date";


        $params[':start_date'] = $start_date;
        $params[':end_date'] = $end_date;
        }

        $query .=" GROUP BY YEAR(date), MONTH(date), type
        ORDER BY YEAR(date), MONTH(date);";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }


    //get expenses or enters by user and time range in base their category
    public function geAllExpenses(int $idUser,string $type, ?string $start_date = null, ?string $end_date = null){
        $query = "
        SELECT category,
        SUM(amount)  AS total 
        FROM pocket.transactions 
        WHERE type = :type
        and user_id = :user_id
        ";

        $params = [
            ":user_id" => $idUser,
            ":type" => $type
        ];

        if (!empty($start_date) && !empty($end_date)) {
            $query .= " AND date BETWEEN :start_date AND :end_date";

            $params[':start_date'] = $start_date;
            $params[':end_date'] = $end_date;
        }else{
            $query .= "
             AND date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
            AND date <  DATE_ADD(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH)
            ";
        }

        $query .= " GROUP BY category";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    

    //get sum of all expenses filter by time range
    public function SumExpensesVSEntry(int $idUser, string $type, ?string $start_date = null, ?string $end_date = null){

        $query = "
        SELECT type, 
        SUM(amount) As total 
        FROM pocket.transactions 
        WHERE type = :type
        AND user_id = :user_id
        ";

        $params = [
            ":user_id" => $idUser,
            ":type" => $type
        ];

        if (!empty($start_date) && !empty($end_date)) {

            $query .= " AND date BETWEEN :start_date AND :end_date";

            $params[':start_date'] = $start_date;
            $params[':end_date'] = $end_date;
        } 

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);

        $results = $stmt->fetch(PDO::FETCH_ASSOC);

        return $results;

    }



}
