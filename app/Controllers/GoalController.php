<?php



namespace App\Controllers;

use PDO;
use App\Services\GoalService;
use App\Services\AuthService;

class GoalController
{
    private GoalService $goalService;
    private AuthService $authService;

    public function __construct(PDO $db)
    {
        $this->goalService = new GoalService($db);
        $this->authService  = new AuthService();
    }

    public function showAll(){
        try{
            $userId = $this->authService->getUserIdFromRequest();
            if (!$userId) {
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "error" => "token scaduto, rieffettare l'accesso",
                ]);
                exit;
            }
        
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

            $userId = $this->authService->getUserIdFromRequest();
            if(!$userId){
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "error" => "token scaduto, rieffettare l'accesso",
                ]);
                exit;
            }

            $data = json_decode(file_get_contents("php://input"), true);


            $date= $data['date'] ?? null;
            $target_amount = $data['target_amount'] ?? null;
            $current_amount = $data['current_amount'] ?? 0;
            $description = $data['description'] ?? null;
            unset($data['request']);



            if (empty($userId) || empty($target_amount) || empty($date)) {
                http_response_code(400);

                echo json_encode([
                    "success" => false,
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
                    "data" =>  $IdGoal
                ]);
                exit;
            }
        } catch (\Throwable $e) {
            http_response_code(401);

            echo json_encode([
                "success" => false,
                "error" => $e->getMessage(),
            ]);
            exit;
        }
    }



    
    public function delete($id)
    {
        try {

            $userId = $this->authService->getUserIdFromRequest();
            if (!$userId) {
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "error" => "token scaduto, rieffettare l'accesso",
                ]);
                exit;
            }

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



    //update goal and add transation
    public function updateGoal(){
        try {

            $userId = $this->authService->getUserIdFromRequest();
            if (!$userId) {
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "error" => "token scaduto, rieffettare l'accesso",
                ]);
                exit;
            }

            $date = json_decode(file_get_contents("php://input"), true);

            $idGoal= $date['idGoal'] ?? null;
            $new_value = $date['newValue'] ?? null;

            

            if(!$idGoal || !$new_value){

                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "error" => "Dati incompleti o mancanti, riprovare",
                ]);
                exit;
            }

            $data = $this ->goalService->updateGoal($idGoal,$new_value, $userId);


            if($data){

                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "data" =>  $data
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
}

