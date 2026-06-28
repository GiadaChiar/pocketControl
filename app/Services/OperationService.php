<?php

namespace App\Services;


use App\Services\TransactionService;
use App\Models\UserModel;
use App\Models\OperationModel;


use PDO;


// User operations
class OperationService
{

    private PDO $db;
    private TransactionService $transaction;
    private UserModel $userModel;
    private OperationModel $operationModel;


    public function __construct(PDO $db)
    {
        $this->db = $db;
        $this->transaction = new TransactionService($db);
        $this->operationModel = new OperationModel($db);
        $this->userModel = new UserModel($db);
        
    }

    public function insert ($data, $idUser){
        
        try{
        //search by userID 
        $existingUser = $this->userModel->findByField("id",$idUser);

        if(!$existingUser){
            throw new \Exception("Utente non registrato correttamente, effettuare il login");
        }

        $idInsert = $this->operationModel->insert($data, $idUser);
        
        if(empty($idInsert)){
            throw new \Exception("Errore durante l'inserimento della nuova transazione, riprovare");
        }

        return $idInsert;

        } catch (\Throwable $e) {

            throw new \Exception("Inserimento,non è stato completato");
        
            exit;
        }
    }


    public function getAll(int $idUser, ?array $data = null, ?string $field = null, ?string $value = null){
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
        
        if(empty($results)){

            throw new \Exception("Nessuna operazione trovata");
        }

        return $results;
        
        } catch (\Throwable $e) {

            throw new \Exception($e->getMessage());
            return null;
            exit;
        }
    }


    public function delete(int $id, int $userId): bool
    {
        $user = $this->userModel->findByField("id", $userId);

        if (!$user) {
            throw new \Exception("Utente non valido");
        }

        return $this->operationModel->delete($id, $userId);
    }


    public function category():?array{
        $categories= $this->operationModel-> allCategories();

        if (empty($categories)){
            throw new \Exception("Nessuna categoria trovata");
        }

        return $categories;
    } 


    public function monthOperations(int $idUser, ?string $start_date = null, ?string $end_date = null ){

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
            return null;
            exit;
        }
    }



    public function allExpenses(int $idUser,string $type, ?string $start_date = null, ?string $end_date = null){
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
            return null;
            exit;
        }
    }

}