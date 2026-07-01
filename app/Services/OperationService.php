<?php

namespace App\Services;



use App\Models\UserModel;
use App\Models\OperationModel;
use App\Models\BudgetModel;
use App\Services\MailService;
use App\Services\TransactionService;



use PDO;


// User operations
class OperationService
{

    private PDO $db;
    private UserModel $userModel;
    private OperationModel $operationModel;
    private BudgetModel $budgetModel;
    private MailService $mailService;
    private TransactionService $transactionService;


    public function __construct(PDO $db)
    {
        $this->db = $db;
        $this->operationModel = new OperationModel($db);
        $this->userModel = new UserModel($db);
        $this->budgetModel = new BudgetModel($db);
        $this->mailService = new MailService();
        $this->transactionService = new TransactionService($db);
    }


    //new operation
    public function insert($data, $idUser)
    {

        return $this->transactionService->run(function ($db) use ($data, $idUser){

            //search by userID 
            $existingUser = $this->userModel->findByField("id", $idUser);

            if (!$existingUser) {
                throw new \Exception("Utente non registrato correttamente, effettuare il login");
            }

            $user = $existingUser;

            //insert new operation
            $idInsert = $this->operationModel->insert($data, $idUser);

                if ($data["type"] !== "spesa") {
                return [
                    "success" => true,
                    "idInsert" => $idInsert,
                    "budgets" => []
                ];
                }

                //find budgets
                $budgets = $this->budgetModel->findBugetByDate((int)$idUser, $data["date"]);

                if (!$budgets){
                    return [
                        "success" => true,
                        "idInsert" => $idInsert,
                        "budgets" => []
                    ];
                } 
    
                $result = [];
                $errors = [];

                foreach ($budgets as $budget) {
                    //sum expenses
                    $expense = $this->operationModel->SumExpensesVSEntry($idUser, "spesa" , $budget["start_date"], $budget["end_date"]);
                    $totalExpense = !empty($expense) ? (float)$expense[0]['total'] : 0;

                    //check percentage
                    $percentage = ($totalExpense / (float)$budget["limit_amount"]) * 100;

                    //ALERT EMAIL 85%

                    
                    if ($percentage >= 85 && !$budget["email_85_sent"]) {

                        $ok= $this->mailService->sendBudgetAlert(
                            $user["email"],
                            $user["name"],
                            $budget["description"],
                            round($percentage, 2)
                        );
                        if ($ok) {
                            $this->budgetModel->setEmail85Sent($budget["id"]);
                        } else {
                            $errors[] = "Email 85 fallita: {$budget['description']}";
                        }
                    }

                    //ALERT EMAIL 100%
                    if ($percentage >= 100 && !$budget["email_100_sent"]) {

                        $ok = $this->mailService->sendBudgetAlert(
                            $email = $user["email"],
                            $user["name"],
                            $budget["description"],
                            round($percentage, 2)
                        );

                        if ($ok) {
                            $this->budgetModel->setEmail100Sent($budget["id"]);
                        } else {
                            $errors[] = "Email 100 fallita: {$budget['description']}";
                        }
                    }
        

                    $result[] = [
                        "success" => true,
                        "budget" => $budget["limit_amount"],
                        "used" => $totalExpense,
                        "percentage" => $percentage,
                        "idInsert" => $idInsert,
                        "description" => $budget["description"]
                    ];
                }
                return [
                    "success" => true,
                    "idInsert" => $idInsert,
                    "budgets" => $result
                ];
        });
    }


    //get all operations by range and type
    public function getAll(int $idUser, ?array $data = null, ?string $field = null, ?string $value = null)
    {
        try {

            //search by userID 
            $existingUser = $this->userModel->findByField("id", $idUser);

            if (!$existingUser) {
                throw new \Exception("Utente non registrato correttamente, effettuare il login");
            }
            $results = $this->operationModel->get(
                $idUser,
                $data,
                $field,
                $value,
            );

            if (empty($results)) {

                throw new \Exception("Nessuna operazione trovata");
            }

            return $results;
        } catch (\Throwable $e) {

            throw new \Exception($e->getMessage());
        }
    }


    //delete operation
    public function delete(int $id, int $userId): bool
    {
        $user = $this->userModel->findByField("id", $userId);

        if (!$user) {
            throw new \Exception("Utente non valido");
        }

        return $this->operationModel->delete($id, $userId);
    }

    public function category(): ?array
    {
        $categories = $this->operationModel->allCategories();

        if (empty($categories)) {
            throw new \Exception("Nessuna categoria trovata");
        }

        return $categories;
    }


    //operations by month and type in a specific time range 
    public function monthOperations(int $idUser, ?string $start_date = null, ?string $end_date = null)
    {
        try {
            //search by userID 
            $existingUser = $this->userModel->findByField("id", $idUser);

            if (!$existingUser) {
                throw new \Exception("Utente non registrato correttamente, effettuare il login");
            }

            $results = $this->operationModel->getMonthOperation(
                $idUser,
                $start_date,
                $end_date
            );

            if (empty($results)) {

                throw new \Exception("Nessuna operazione trovata");
            }

            return $results;
        } catch (\Throwable $e) {

            throw new \Exception($e->getMessage());
        }
    }


    //all expenses
    public function allExpenses(int $idUser, string $type, ?string $start_date = null, ?string $end_date = null)
    {
        try {
            //search by userID 
            $existingUser = $this->userModel->findByField("id", $idUser);

            if (!$existingUser) {
                throw new \Exception("Utente non registrato correttamente, effettuare il login");
            }

            $results = $this->operationModel->geAllExpenses(
                $idUser,
                $type,
                $start_date,
                $end_date
            );

            if (empty($results)) {

                throw new \Exception("Nessuna operazione trovata");
            }

            return $results;
        } catch (\Throwable $e) {

            throw new \Exception($e->getMessage());
        }
    }


    //get total entry by user

    public function getTotalEntry(int $idUser){
        try {

            $result = $this->operationModel->SumExpensesVSEntry($idUser,"entrata");
            
        return $result['total'] ?? 0;

    } catch (\Throwable $e) {
            throw new \Exception($e->getMessage());
        }
    }
}