<?php

namespace App\Services;


use App\Services\TransactionService;
use App\Models\UserModel;
use App\Models\BudgetModel;
use App\Models\OperationModel;
use PDO;


// User operations
class BudgetService
{

private PDO $db;
private TransactionService $transaction;
private UserModel $userModel;
private BudgetModel $budgetModel;
private OperationModel $operationModel;


public function __construct(PDO $db)
{
$this->db = $db;
$this->transaction = new TransactionService($db);
$this->budgetModel = new BudgetModel($db);
$this->userModel = new UserModel($db);
$this->operationModel = new OperationModel($db);

}

public function insert ($data, $idUser){

try{
//search by userID
$existingUser = $this->userModel->findByField("id",$idUser);

if(!$existingUser){
throw new \Exception("Utente non registrato correttamente, effettuare il login");
}

$idInsert = $this->budgetModel->insert($data, $idUser);

if(empty($idInsert)){
throw new \Exception("Errore durante l'inserimento della nuova transazione, riprovare");
}

return $idInsert;

} catch (\Throwable $e) {

throw new \Exception("Inserimento,non è stato completato");

exit;
}
}


    public function getAll($idUser ,$data= null)
    {
        try {
            //search by userID 
            $existingUser = $this->userModel->findByField("id", (int)$idUser);

            if (!$existingUser) {
                throw new \Exception("Utente non registrato correttamente, effettuare il login");
            }
            
            if($data){
                $results = $this->budgetModel->get($idUser, $data);
            }else{
                $results = $this->budgetModel->get($idUser);
            }

            

        

            if (empty($results)) {
                throw new \Exception(",Nessun obbiettivo presente");
            }
            return $results;
        } catch (\Throwable $e) {

            throw new \Exception("Il rescupero,non è stato completato" . $e->getMessage());

            exit;
        }
    }



    public function delete(int $id, int $userId): int
    {
        $user = $this->userModel->findByField("id", $userId);

        if (!$user) {
            throw new \Exception("Utente non valido");
        }

        return $this->budgetModel->delete($id, $userId);
    }

/*

//get all bugets state 
    public function allBugets(int $idUser, ?string $start_date = null, ?string $end_date = null)
    {
        try {
            //search by userID 
            $existingUser = $this->userModel->findByField("id", $idUser);

            if (!$existingUser) {
                throw new \Exception("Utente non registrato correttamente, effettuare il login");
            }

            //get sum of all expenses operations
            $results = $this->operationModel->SumExpenses(
                $idUser,
                $start_date,
                $end_date
            );

            if (empty($results)) {

                throw new \Exception("Nessuna operazione trovata");
            }

            // all bugets 

            return $results;
        } catch (\Throwable $e) {

            throw new \Exception($e->getMessage());
            return null;
            exit;
        }
    }

*/



    public function getBudgetSummary(int $idUser, ?array $data = null)
    {


        if($data){
                $budgets = $this->getAll($idUser, $data);
        }else{
            $budgets = $this->getAll($idUser);
        }
        // 1. prendo budgets già filtrati

        foreach ($budgets as &$budget) {


            // 2. somma spese per range del budget (NON user range)
            $spent = $this->operationModel->SumExpenses(
                $idUser,
                $budget["start_date"],
                $budget["end_date"]
            );


           


            // se la query ritorna già un numero
            $totalSpent = $spent[0]["total"] ?? 0;


            // 3. calcoli
            $budget["spent"] = (float)$totalSpent;

           
            $budget["remaining"] = (float)$budget["limit_amount"] - (float)$budget["spent"];
            /*
        if ($budget["limit_amount"] < $budget["spent"]){

            $budget["progress"] = 101; //over buget
        }else{
            $budget["progress"] = $budget["limit_amount"] > 0
                ? ($budget["spent"] / $budget["limit_amount"]) * 100
                : 0;
        }
*/
                $budget["progress"] = $budget["limit_amount"] > 0
                    ? ($budget["spent"] / $budget["limit_amount"]) * 100
                    : 0;
            
            
        }

        return $budgets;
    }
}

