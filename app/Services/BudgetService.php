<?php

namespace App\Services;


use App\Models\UserModel;
use App\Models\BudgetModel;
use App\Models\OperationModel;
use PDO;


// User operations
class BudgetService
{

    private PDO $db;
    private UserModel $userModel;
    private BudgetModel $budgetModel;
    private OperationModel $operationModel;


    public function __construct(PDO $db)
    {
        $this->db = $db;
        $this->budgetModel = new BudgetModel($db);
        $this->userModel = new UserModel($db);
        $this->operationModel = new OperationModel($db);
    }


    //new budget
    public function insert($data, $idUser)
    {

        try {
            //search by userID
            $existingUser = $this->userModel->findByField("id", $idUser);

            if (!$existingUser) {
                throw new \Exception("Utente non registrato correttamente, effettuare il login");
            }

            $idInsert = $this->budgetModel->insert($data, $idUser);

            if (empty($idInsert)) {
                throw new \Exception("Errore durante l'inserimento della nuova transazione, riprovare");
            }

            return $idInsert;
        } catch (\Throwable $e) {
            throw new \Exception("Inserimento,non è stato completato");
        }
    }



    //get all budgets
    public function getAll($idUser, $data = null)
    {
        try {
            //search by userID 
            $existingUser = $this->userModel->findByField("id", (int)$idUser);

            if (!$existingUser) {
                throw new \Exception("Utente non registrato correttamente, effettuare il login");
            }

            $results = $this->budgetModel->get($idUser, $data);


            if (empty($results)) {
                throw new \Exception(", Nessun budget presente");
            }
            return $results;
        } catch (\Throwable $e) {

            throw new \Exception("Il rescupero,non è stato completato" . $e->getMessage());
        }
    }



    //delete budget
    public function delete(int $id, int $userId): int
    {
        $user = $this->userModel->findByField("id", $userId);

        if (!$user) {
            throw new \Exception("Utente non valido");
        }
        return $this->budgetModel->delete($id, $userId);
    }




//sum expenses for each budget by time range
    public function getBudgetSummary(int $idUser, ?array $data = null)
    {

        if ($data) {
            $budgets = $this->getAll($idUser, $data);
        } else {
            $budgets = $this->getAll($idUser);
        }
        // expenses foreach budget
        foreach ($budgets as &$budget) {


            // sum expenses by time range
            $spent = $this->operationModel->SumExpensesVSEntry(
                $idUser,
                "spesa",
                $budget["start_date"],
                $budget["end_date"]
            );

            // sum
            $totalSpent = $spent[0]["total"] ?? 0;
            $budget["spent"] = (float)$totalSpent;

            $budget["remaining"] = (float)$budget["limit_amount"] - (float)$budget["spent"];
            $budget["progress"] = $budget["limit_amount"] > 0
                ? ($budget["spent"] / $budget["limit_amount"]) * 100
                : 0;
        }
        return $budgets;
    }
}
