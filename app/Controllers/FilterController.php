<?php


namespace App\Controllers;

use App\Services\BudgetService;
use PDO;
use App\Services\GoalService;
use App\Services\OperationService;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class FilterController
{
    private GoalService $goalService;
    private OperationService $operationService;
    private BudgetService $budgetService;

    public function __construct(PDO $db)
    {
        $this->goalService = new GoalService($db);
        $this->operationService = new OperationService($db);
        $this->budgetService = new BudgetService($db);
    }


    //get all goals or bugets or operations by range time
    public function filters(){
        try {
            $headers = getallheaders();

            $authHeader = $headers['Authorization'] ?? null;

            if (!$authHeader) {
                http_response_code(401);

                echo json_encode([
                    "success" => false,
                    "error" => "user token non disponibile, riprovare l'autentificazione"
                ]);
                exit;
            }

            $token = str_replace('Bearer ', '', $authHeader);

            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            $userId = $decoded->user_id;

            $data = json_decode(file_get_contents("php://input"), true);


        
            if($data["tipology"] === "goals" ){
                $results = $this->goalService->getAll($userId, $data);

                if($results){
                    echo json_encode([
                        "success" => true,
                        "type" => "goalTable",
                        "date" => $results
                    ]);
                    exit;
                }
            }

            if ($data["tipology"] === "transactions") {
                $results = $this->operationService->getAll($userId, $data);


                if ($results) {
                    echo json_encode([
                        "success" => true,
                        "type" => "transactionTable",
                        "date" => $results
                    ]);
                    exit;
                }
            }

            if ($data["tipology"] === "budgets") {
                $results = $this->budgetService->getAll($userId, $data);

                if ($results) {
                    echo json_encode([
                        "success" => true,
                        "type" => "bugetTable",
                        "date" => $results
                    ]);
                    exit;
                }
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

    public function delete(){
        try {
            $headers = getallheaders();

            $authHeader = $headers['Authorization'] ?? null;

            if (!$authHeader) {
                http_response_code(401);

                echo json_encode([
                    "success" => false,
                    "error" => "user token non disponibile, riprovare l'autentificazione"
                ]);
                exit;
            }

            $token = str_replace('Bearer ', '', $authHeader);

            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            $userId = $decoded->user_id;

            $data = json_decode(file_get_contents("php://input"), true);


            if ($data["type"] === "goals") {
                $idElement = $this->goalService->delete($data["id"], $userId);

                if ($idElement) {
                    echo json_encode([
                        "success" => true,
                        "type" => "bugetTable",
                        "date" => $idElement
                    ]);
                    exit;
                }
            }

            if ($data["type"] === "transactions") {

                $idElement = $this->operationService->delete($data["id"], $userId);

                if ($idElement) {
                    echo json_encode([
                        "success" => true,
                        "type" => "bugetTable",
                        "date" => $idElement
                    ]);
                    exit;
                }
            }

            if ($data["type"] === "budgets") {
                
                
            
                $idElement = $this-> budgetService->delete($data["id"],$userId);
                
                if($idElement){
                    echo json_encode([
                        "success" => true,
                        "type" => "bugetTable",
                        "date" => $idElement
                    ]);
                    exit;
                }
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
    

}