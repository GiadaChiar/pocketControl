<?php



namespace App\Controllers;

use PDO;
use App\Services\GoalService;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GoalController
{
    private GoalService $goalService;

    public function __construct(PDO $db)
    {
        $this->goalService = new GoalService($db);
    }

    public function showAll(){
        try{
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
        

            $goals = $this->goalService->getALL($userId);

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
                    "type" => "insertGoal",
                    "error" => "user token non disponibile, riprovare l'autentificazione"
                ]);
                exit;
            }

            $token = str_replace('Bearer ', '', $authHeader);

            
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            $userId = $decoded->user_id;



            $data = json_decode(file_get_contents("php://input"), true);

            $date= $data['date'] ?? null;
            $target_amount = $data['target_amount'] ?? null;
            $current_amount = $data['current_amount'] ?? null;
            $description = $data['description'] ?? null;
            unset($data['request']);



            if (empty($userId) || empty($current_amount) || empty($target_amount) || empty($date)) {
                http_response_code(400);

                echo json_encode([
                    "success" => false,
                    "type" => "insertGoal",
                    "error" => "Campi mancanti o incorretti",
                    "date" => $date
                ]);
                exit;
            }


            // ckeck user_id 
            $IdGoal = $this->goalService->insert($data, $userId);

            if ($IdGoal) {

                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "type" => "transaction",
                    "data" =>  $IdGoal
                ]);
                exit;
            }
        } catch (\Throwable $e) {
            http_response_code(401);

            echo json_encode([
                "success" => false,
                "type" => "transaction",
                "error" => $e->getMessage(),
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

            $result = $this->goalService->delete((int)$id, (int)$userId);

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
}

