<?php

namespace App\Services;


use App\Services\TransactionService;
use App\Models\UserModel;
use App\Models\GoalModel;
use App\Models\OperationModel;
use App\Services\MailService;



use PDO;


// User operations
class GoalService
{

    private PDO $db;
    private TransactionService $transactionService;
    private UserModel $userModel;
    private GoalModel $goalModel;
    private OperationModel $operationModel;
    private MailService $mailService;



    public function __construct(PDO $db)
    {
        $this->db = $db;
        $this->transactionService = new TransactionService($db);
        $this->userModel = new UserModel($db);
        $this->goalModel = new GoalModel($db);
        $this->operationModel = new OperationModel($db);
        $this->mailService = new MailService();
    }


    //new Goal
    public function insert($data, $idUser)
    {

        try {
            //search by userID 
            $existingUser = $this->userModel->findByField("id", $idUser);

            if (!$existingUser) {
                throw new \Exception("Utente non registrato correttamente, effettuare il login");
            }

            $idInsert = $this->goalModel->insert($data, $idUser);

            if (empty($idInsert)) {
                throw new \Exception("Errore durante l'inserimento della nuova transazione, riprovare");
            }

            return $idInsert;
        } catch (\Throwable $e) {

            throw new \Exception("Inserimento,non è stato completato");
        }
    }



    //get all bugets by range time
    public function getAll($idUser, $data = null)
    {
        try {
            //search by userID 
            $existingUser = $this->userModel->findByField("id", (int)$idUser);

            if (!$existingUser) {
                throw new \Exception("Utente non registrato correttamente, effettuare il login");
            }

            $results = $this->goalModel->get($idUser, $data);

            if (empty($results)) {
                throw new \Exception(",Nessun obbiettivo presente");
            }
            return $results;
        } catch (\Throwable $e) {

            throw new \Exception("Il rescupero,non è stato completato" . $e->getMessage());
        }
    }




    //delete goal
    public function delete(int $id, int $userId): bool
    {
        $user = $this->userModel->findByField("id", $userId);

        if (!$user) {
            throw new \Exception("Utente non valido");
        }

        return $this->goalModel->delete($id, $userId);
    }



//update Goal with sum with user value
    public function updateGoal(int $idGoal, float $new_value, int $userId)
    {

        return $this->transactionService->run(function ($db) use ($idGoal, $new_value,$userId) {                                                                  
        //check if existing goal and get updateGoalcontroll with user
            //search by userID 
            $data = $this->goalModel->getFromId($userId, $idGoal);

            if (!$data) {
                throw new \Exception("Obbiettivo non trovato");
            }

            $sum = (float)$data["current_amount"] + (float)$new_value;

            $this->goalModel->update((int)$userId, (int)$idGoal, (float)$sum);

            //new insert operation stransfer goal name
            $new_data = [
                "category" => "obbiettivo",
                "type" => "transfer",
                "amount" => $new_value,
                "description" => "Spostamento obiettivo: " . $data["description"],
                "date" => date("Y-m-d")
            ];

            $idInsert = $this->operationModel->insert($new_data, (int)$userId);

            //email logic 
            $percentage = ($sum / $data["target_amount"]) * 100;

                // EMAIL LOGIC
                if ($percentage >= 85 ) {
                $user = $this->userModel->findByField("id", $userId);

                    $this->mailService->sendGoalCongrats(
                        $user["email"],
                        $user["name"],
                        $data["description"],
                        $percentage
                    );

                    $this->goalModel->setEmail85Sent($idGoal);
                }

                if ($percentage >= 100 && !$data["email_100_sent"]) {

                $user = $this->userModel->findByField("id", $userId);
                
                    $this->mailService->sendGoalCongrats(
                        $user["email"],
                        $user["name"],
                        $data["description"],
                        $percentage
                    );

                    $this->goalModel->setEmail100Sent($idGoal);
                }
            return [
                "success" => true,
                "data" => $sum,
                "percentage" => $percentage
            ];
        });
    }
}
