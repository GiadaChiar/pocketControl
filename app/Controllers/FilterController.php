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
    }

    public function filters(){
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

            $data = json_decode(file_get_contents("php://input"), true);

            echo json_encode([
                "success" => true,
                "date" => $data,
                "id"=> $userId
            ]);
            exit;

            if($data["tipology"] === "goals" ){
                $results = $this->goalService->getAll($userId);

                if($results){
                    echo json_encode([
                        "success" => true,
                        "date" => $results
                    ]);
                    exit;
                }
            }

            /*if($data)

            echo json_encode([
                "success" => false,
                "type" => "insertGoal",
                "error" => "Campi mancanti o incorretti",
                "date" => $data
            ]);
            exit;*/
            
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