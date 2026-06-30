<?php



namespace App\Controllers;

use PDO;
use App\Services\OperationService;
use App\Services\AuthService;


class OperationController
{
    private OperationService $operationService;
    private AuthService $authService;

    public function __construct(PDO $db)
    {
        $this->operationService = new OperationService($db);
        $this->authService  = new AuthService();
    }


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
            $userId = $this->authService->getUserIdFromRequest();
            if (!$userId) {
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "error" => "token scaduto, rieffettare l'accesso",
                ]);
                exit;
            }


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
            $userId = $this->authService->getUserIdFromRequest();
            if (!$userId) {
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "error" => "token scaduto, rieffettare l'accesso",
                ]);
                exit;
            }


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
    }


    
    public function monthsOperations(){
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

            //optional filter 
            $start_date= $_GET['start_date'] ?? null;
            $end_date =  $_GET['end_date'] ?? null;
            
            if($start_date && $end_date){
                $results = $this->operationService->monthOperations($userId,$start_date,$end_date);
                $title = "Entrate e spese con i ricavati nel periodo selezionato";
            }else{
                $results = $this->operationService->monthOperations($userId);
                $title = "Entrate e spese con i ricavati totali per mese";
            }

            if ($results) {
                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "title" => $title,
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



    public function expenses(){
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


            //optional filter 
            $start_date = $_GET['start_date'] ?? null;
            $end_date =  $_GET['end_date'] ?? null;
            $type = $_GET['typology'] ?? null;



            //default spesa

            if($type){
                if ($start_date && $end_date) {
                    $results = $this->operationService->allExpenses($userId, $type,$start_date, $end_date);
                    $title = "Divisione della {$type} nel periodo selezionato";
                }else{
                    $results = $this->operationService->allExpenses($userId,$type);
                    $title = "Divisione della {$type} dell'ultimo mese";
                }
            }else{
                $results = $this->operationService->allExpenses($userId, "spesa");
                $title = "Divisione delle spese dell'ultimo mese";
            }

            if ($results) {
                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "title" => $title,
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
