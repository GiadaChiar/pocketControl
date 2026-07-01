<?php



namespace App\Controllers;

use PDO;
use App\Services\UserService;

class UserController
{
    private UserService $userService;
    

    public function __construct(PDO $db)
    {
        $this->userService = new UserService($db);
    }


    public function login()
    {
        try {

            header('Content-Type: application/json');
            // INPUT JSON da React
            $data = json_decode(file_get_contents("php://input"), true);

            $email = $data['email'] ?? null;
            $password = $data['password'] ?? null;


            if (!$email || !$password) {
                http_response_code(400);

                echo json_encode([
                    "success" => false,
                    "error" => "credenziali incomplete",
                ]);
                exit;
            }

            $token = $this->userService->login($email, $password);

            if ($token) {
                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "data" => $token
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





    public function registration()
    {


        try {

            header('Content-Type: application/json');
            // INPUT JSON da React
            $data = json_decode(file_get_contents("php://input"), true);

            $email = $data['email'] ?? null;
            $name = $data['name'];
            $surname = $data['surname'];
            $password = $data['password'] ?? null;


            if (empty($email) || empty($name) || empty($surname) || empty($password)) {
                http_response_code(400);

                echo json_encode([
                    "success" => false,
                    "error" => "Campi mancanti o incorretti",
                    "data" => $data
                ]);
                exit;
            }

            // chiamata service
            $IdUser = $this->userService->registration($data);

            if ($IdUser) {

                http_response_code(200);

                echo json_encode([
                    "success" => true,
                    "data" =>  $IdUser
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
}
