<?php

namespace App\Services;

use App\Models\UserModel;
use App\Models\InsertModel;
use App\Services\TransactionService;
use Firebase\JWT\JWT;
use PDO;


// User operations
class UserService
{

    private PDO $db;
    private TransactionService $transaction;
    private UserModel $userModel;
    



    public function __construct(PDO $db)
    {
        $this->db = $db;
        $this->transaction = new TransactionService($db);
        $this->userModel = new UserModel($db);
    }



    //login user
    public function login(string $email, string $password): ?string
    {

        //1. Search user by email
        $user = $this->userModel->findByField("email", $email);

        if (!$user) {
            throw new \Exception(
                "Nessun utente registrato con questa email"
            );
        }

        // 2.check if my password equal to db password
        if ($password !== $user['password']) {
            throw new \Exception("Password errata, riprovare");
        }

        //payload JMT
        $payload = [
            "user_id" => $user['id'],
            "email" => $user['email'],
            "iat" => time(),
            "exp" => time() + 3600 // 1 ora
        ];

        //new token 
        $token = JWT::encode(
            $payload,
            $_ENV['JWT_SECRET'],
            'HS256'
        );

        
        if ($token) {
            return $token;
        }

        return null;
    }




    // registration new user
    public function registration(array $data): ?int
    {


        return $this->transaction->run(
            function (PDO $db) use ($data) {



                //1.check if already exist user search by email
                $existing = $this->userModel->findByField("email",$data['email']);

                if ($existing) {
                    throw new \Exception("L'email è già stata registrata, passa al login");
                }

                unset($data['request']);

                //2. Insert new User
                $userId = $this->userModel->insert($data);

                if (!$userId) {
                    throw new \Exception("Errore non è stato possibile effettuare la registrazione, controllare la connessione o utente già registrato");
                }

                return $userId;
            }
        );
    }
}
