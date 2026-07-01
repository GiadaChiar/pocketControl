<?php


namespace App\Controllers;

use App\Services\BudgetService;
use PDO;
use App\Services\GoalService;
use App\Services\OperationService;
use App\Services\AuthService;


class FilterController
{
    private GoalService $goalService;
    private OperationService $operationService;
    private BudgetService $budgetService;
    private AuthService $authService;

    public function __construct(PDO $db)
    {
        $this->goalService = new GoalService($db);
        $this->operationService = new OperationService($db);
        $this->budgetService = new BudgetService($db);
        $this->authService  = new AuthService();
    }


    //get all goals or bugets or operations by range time
    public function filters()
    {
        try {
            $userId = $this->authService->getUserIdFromRequest();
            $data = json_decode(file_get_contents("php://input"), true);

            if ($data["tipology"] === "goals") {
                $results = $this->goalService->getAll($userId, $data);

                if ($results) {
                    echo json_encode([
                        "success" => true,
                        "type" => "goalTable",
                        "date" => $results
                    ]);
                    exit;
                }
            }

            if ($data["tipology"] === "transactions") {

                $extraType = $data["extra_type"] ?? null;
                if (!empty($extraType) && ($extraType === "spesa" || $extraType === "entrata")) {

                    $results = $this->operationService->getAll(
                        $userId,
                        $data,
                        "type",
                        $extraType
                    );
                } else {
                    $results = $this->operationService->getAll($userId, $data);
                }

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


//delete for different category (table)
    public function delete()
    {
        try {
            $userId = $this->authService->getUserIdFromRequest();
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

                $idElement = $this->budgetService->delete($data["id"], $userId);

                if ($idElement) {
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
