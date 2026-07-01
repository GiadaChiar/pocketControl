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

    //new operation
    public function insert()
    {
        try {

            $userId = $this->authService->getUserIdFromRequest();
            $data = json_decode(file_get_contents("php://input"), true);
            $category = $data['category'] ?? null;
            $type = $data['type'] ?? null;
            $amount = $data['amount'] ?? null;
            $date = $data["date"] ?? null;
            unset($data['request']);

            if (empty($userId) || empty($category) || empty($type) || empty($amount) || empty($date)) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
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
                    "data" =>  $IdOperation
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



    //get operations
    public function showAll(){

    try{
            $userId = $this->authService->getUserIdFromRequest();
            //optional filters 
            $type = $_GET['type'] ?? null;
            $category = $_GET['category'] ?? null;

            $field = null;
            $value = null;

            if ($category || $type) {
                $field = $category ? "category" : "type";
                $value = $category ?? $type;

                $operations = $this->operationService->getALL(
                    (int)$userId,
                    $field,
                    $value
                );
            } else {
                $operations = $this->operationService->getALL((int)$userId);
            }

            echo json_encode([
                "success" => true,
                "type" => "transaction",
                "data" => $operations ?? []
            ]);
            exit;

            http_response_code(200);
        
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

    

    //delete operation
    public function delete($id)
    {
        try {
            $userId = $this->authService->getUserIdFromRequest();
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


    //get all categories fields
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



    // sum of the operation for every months by categories
    public function monthsOperations(){
        try{

            $userId = $this->authService->getUserIdFromRequest();
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



    //sum of expenses filter by category and /or time range
    public function expenses(){
        try {

            $userId = $this->authService->getUserIdFromRequest();
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


    // get sum of all entry total
    
    public function allEntry()
    {
        try {

            $userId = $this->authService->getUserIdFromRequest();
            
            $result = $this-> operationService->getTotalEntry((int)$userId);
            if ($result) {
                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "data" => $result
                ]);
                exit;
            }
        } catch (\Throwable $e) {

            http_response_code(500);
            echo json_encode([
                "success" => false,
                "error" => $e->getMessage()
            ]);
            exit;
        }
    }
}
