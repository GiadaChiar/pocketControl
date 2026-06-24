<?php



namespace App\Controllers;

use PDO;
use App\Services\OperationService;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class OperationController
{
    private OperationService $operationService;

    public function __construct(PDO $db)
    {
        $this->operationService = new OperationService($db);
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
                    "type" => "AllGoals",
                    "error" => "user token non disponibile, riprovare l'autentificazione"
                ]);
                exit;
            }

            $token = str_replace('Bearer ', '', $authHeader);
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            $userId = $decoded->user_id;


            $data = json_decode(file_get_contents("php://input"), true);

            $category = $data['category'] ?? null;
            $type = $data['type'] ?? null;
            $amount = $data['amount'] ?? null;
            $description = $data['description'] ?? null;
            $date = $data["date"] ?? null;
            unset($data['request']);



            if (empty($userId) || empty($category) || empty($type) || empty($amount) || empty($date)) {
                http_response_code(400);

                echo json_encode([
                    "success" => false,
                    "type" => "transaction",
                    "error" => "Campi mancanti o incorretti"
                ]);
                exit;
            }


            // ckeck user_id 
            $IdOperation = $this->operationService->insert($data, $userId);

            if ($IdOperation) {

                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "type" => "transaction",
                    "data" =>  $IdOperation
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




    public function showAll(){

    try{
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

            //optional filters 
            $type = $_GET['type'] ?? null;
            $category = $_GET['category'] ?? null;


            if($type || $category){
                $operations = $this->operationService->getALL(
                (int)$userId,
                $category ? "category" : "type",
                $category ?? $type
                );
            }
            else{
                $operations = $this->operationService->getALL($userId);
            }

        if ($operations) {
                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "type" => "transaction",
                    "data" => $operations
                ]);
                exit;
            }
        } catch (\Throwable $e) {

            http_response_code(401);

            echo json_encode([
                "success" => false,
                "type" => "transaction",
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

            $result = $this->operationService->delete((int)$id, (int)$userId);

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


    public function categories(){
        try {
        $results = $this->operationService->category();

        if($results){

                echo json_encode([
                    "success" => true,
                    "data" => $results
                ]);
            exit;
        }

        } catch (\Throwable $e) {
            http_response_code(400);

            echo json_encode([
                "success" => false,
                "error" => $e->getMessage()
            ]);
        }
}   }
