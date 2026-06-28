<?php



namespace App\Controllers;

use PDO;
use App\Services\BudgetService;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class BudgetController
{
    private BudgetService $budgetService;

    public function __construct(PDO $db)
    {
        $this->budgetService = new BudgetService($db);
    }

    //insert new buget
    public function insert()
    {


        try {

            header('Content-Type: application/json');


            $headers = getallheaders();

            $authHeader = $headers['Authorization'] ?? null;

            if (!$authHeader) {
                http_response_code(401);

                echo json_encode([
                    "success" => false,
                    "type" => "insertBudget",
                    "error" => "user token non disponibile, riprovare l'autentificazione"
                ]);
                exit;
            }

            $token = str_replace('Bearer ', '', $authHeader);
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            $userId = $decoded->user_id;


            $data = json_decode(file_get_contents("php://input"), true);

    
            $start_date = $data["start_date"] ?? null;
            $end_date = $data["end_date"] ?? null;
            $limit_amount = $data['limit_amount'] ?? null;
            $description = $data['description'] ?? null;
            
            unset($data['request']);


            if (empty($userId) || empty($limit_amount) || empty($start_date) || empty($end_date)) {
                http_response_code(400);

                echo json_encode([
                    "success" => false,
                    "type" => "insertBudget"
                ]);
                exit;
            }


            // ckeck user_id 
            $IdBudget = $this->budgetService->insert($data, $userId);

            if ($IdBudget) {

                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "type" => "insertBudget",
                    "data" =>  $IdBudget
                ]);
                exit;
            }
        } catch (\Throwable $e) {
            http_response_code(401);

            echo json_encode([
                "success" => false,
                "type" => "insertBudget",
                "error" => $e->getMessage(),
            ]);
            exit;
        }
    }

    //get all bugets 
    public function showAll()
    {
        try {
            $headers = getallheaders();

            $authHeader = $headers['Authorization'] ?? null;

            if (!$authHeader) {
                http_response_code(401);

                echo json_encode([
                    "success" => false,
                    "type" => "AllGoals",
                    "error" => "user token non disponibile, riprovare l'autentificazione"
                ]);
                exit;
            }

            $token = str_replace('Bearer ', '', $authHeader);

            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            $userId = $decoded->user_id;


            $goals = $this->budgetService->getALL($userId);

            if ($goals) {
                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "type" => "AllGoals",
                    "data" => $goals
                ]);
                exit;
            }
        } catch (\Throwable $e) {

            http_response_code(401);

            echo json_encode([
                "success" => false,
                "type" => "AllGoals",
                "error" => $e->getMessage()
            ]);
            exit;
        }
    }


    public function delete($id)
    {
        try {
            header('Content-Type: application/json');

            $headers = getallheaders();
            $authHeader = $headers['Authorization'] ?? null;

            if (!$authHeader) {
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "error" => "Token mancante"
                ]);
                exit;
            }

            $token = str_replace('Bearer ', '', $authHeader);
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            $userId = $decoded->user_id;

            $result = $this->budgetService->delete((int)$id, (int)$userId);

            echo json_encode([
                "success" => true,
                "data" => $result
            ]);
        } catch (\Throwable $e) {
            http_response_code(400);

            echo json_encode([
                "success" => false,
                "error" => $e->getMessage()
            ]);
        }
    }





    public function bugetSummary()
    {
        try {

            header('Content-Type: application/json');
            $headers = getallheaders();

            $authHeader = $headers['Authorization'] ?? null;

            if (!$authHeader) {
                http_response_code(401);

                echo json_encode([
                    "success" => false,
                    "type" => "transaction",
                    "error" => "user token non disponibile, riprovare l'autentificazione"
                ]);
                exit;
            }

            $token = str_replace('Bearer ', '', $authHeader);

            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            $userId = $decoded->user_id;

            //optional filter 
            $start_date = $_GET['start_date'] ?? null;
            $end_date =  $_GET['end_date'] ?? null;

            if ($start_date && $end_date) {
                $filter = [
                    "start_date" => $start_date,
                    "end_date" => $end_date
                ];
                $results = $this->budgetService->getBudgetSummary($userId, $filter);
            }else{
                
                $results = $this->budgetService->getBudgetSummary($userId);
            }



/*
            if ($start_date && $end_date) {
                $results = $this->budgetService->getBudgetSummary($userId, $start_date, $end_date);
            } else {
                exit;
                $results = $this->operationService->allBugets($userId);
            }
*/
            if ($results) {
                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "data" => $results
                ]);
                exit;
            }
        } catch (\Throwable $e) {

            http_response_code(401);

            echo json_encode([
                "success" => false,
                "error" => $e->getMessage()
            ]);
            exit;
        }
    }
}