<?php



namespace App\Controllers;

use PDO;
use App\Services\BudgetService;
use App\Services\AuthService;


class BudgetController
{
    private BudgetService $budgetService;
    private AuthService $authService;
    

    public function __construct(PDO $db)
    {
        $this->budgetService = new BudgetService($db);
        $this->authService  = new AuthService();
    }

    //insert new buget
    public function insert()
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
            $data = json_decode(file_get_contents("php://input"), true);
            $start_date = $data["start_date"] ?? null;
            $end_date = $data["end_date"] ?? null;
            $limit_amount = $data['limit_amount'] ?? null;
            $description = $data['description'] ?? null;

            if (empty($userId) || empty($limit_amount) || empty($start_date) || empty($end_date)) {
                http_response_code(400);

                echo json_encode([
                    "success" => false,
                    "error" => "Completare tutti i campi richiesti nel formato valido"
                ]);
                exit;
            }

            // ckeck user_id 
            $IdBudget = $this->budgetService->insert($data, $userId);

            if ($IdBudget) {
                http_response_code(200);
                echo json_encode([
                    "success" => true,
                    "data" =>  $IdBudget
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



    //get all bugets 
    public function showAll()
    {
        try {
            $userId = $this->authService->getUserIdFromRequest();
            $goals = $this->budgetService->getALL($userId);
            if ($goals) {
                http_response_code(200);
                echo json_encode([
                    "success" => true,
                    "data" => $goals
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


//delete budget
    public function delete($id)
    {
        try {
            $userId = $this->authService->getUserIdFromRequest();
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




// sum of budget
    public function bugetSummary()
    {
        try {
            $userId = $this->authService->getUserIdFromRequest();

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

                http_response_code(401);

                echo json_encode([
                    "success" => false,
                    "error" => "Renge non caricato"
                ]);
                exit;
            }

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