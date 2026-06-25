<?php

namespace App\Services;


use App\Services\TransactionService;
use App\Models\UserModel;
use App\Models\BudgetModel;


use PDO;


// User operations
class BudgetService
{

private PDO $db;
private TransactionService $transaction;
private UserModel $userModel;
private BudgetModel $budgetModel;


public function __construct(PDO $db)
{
$this->db = $db;
$this->transaction = new TransactionService($db);
$this->budgetModel = new BudgetModel($db);
$this->userModel = new UserModel($db);

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
            

            $results = $this->budgetModel->get($idUser,$data);

            if (empty($results)) {
                throw new \Exception(",Nessun obbiettivo presente");
            }
            return $results;
        } catch (\Throwable $e) {

            throw new \Exception("Il rescupero,non è stato completato" . $e->getMessage());

            exit;
        }
    }



    public function delete(int $id, int $userId): bool
    {
        $user = $this->userModel->findByField("id", $userId);

        if (!$user) {
            throw new \Exception("Utente non valido");
        }

        echo json_encode([
            "success" => true,
            "type" => "fin qui",
            "date" => $id,
            "idUser" =>$userId
        ]);
        exit;
        return $this->budgetModel->delete($id, $userId);
    }
}

