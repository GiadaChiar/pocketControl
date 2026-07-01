<?php


namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


//TO use email service change email and add accountgoogle password
class MailService
{
    public function sendGoalCongrats(string $to, string $name, string $goalName, float $percentage)
    {
        $mail = new PHPMailer(true);

        try {

            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;

            $mail->Username = 'youremail@gmail.com';
            $mail->Password = 'yourpassword';

            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->SMTPDebug = 2;
            $mail->Debugoutput = 'html';

            $mail->setFrom('youremail@gmail.com', 'Finance App');
            $mail->addAddress($to);

            $mail->isHTML(false);

            $mail->Subject = "🎯 Obiettivo quasi raggiunto";

            $mail->Body =
                "Ciao $name!

        Il tuo obiettivo \"$goalName\" è al $percentage%.

        Continua così 💪";

            return $mail->send();
        } catch (Exception $e) {
            throw new \Exception($e->getMessage());
        } 
    }  



    public function sendBudgetAlert(string $to, string $name, string $budgetName, float $percentage)
    {
        $mail = new PHPMailer(true);

        try {
            var_dump("STEP 1 - START");

            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;

            $mail->Username = 'youremail@gmail.com';
            $mail->Password = 'yourpassword';

            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;

            $mail->SMTPDebug = 2;
            $mail->Debugoutput = function ($str, $level) {
                error_log("SMTP DEBUG: " . $str);
            };

            var_dump("STEP 2 - CONFIG OK");

            $mail->setFrom('youremail@gmail.com', 'Finance App');
            $mail->addAddress($to);

            var_dump("STEP 3 - ADDRESS OK");

            $mail->isHTML(false);

            $mail->Subject = "Alert Budget";

            $mail->Body =
                "Ciao $name!\n\nSei al $percentage% del tuo Budget: \"$budgetName\"\n\nTieni duro! 💪";

            var_dump("STEP 4 - BEFORE SEND");

            $sent = $mail->send();

            var_dump("STEP 5 - AFTER SEND");

            return [
                "success" => true,
                "sent" => $sent,
                "error" => $mail->ErrorInfo
            ];
        } catch (\Throwable $e) {

            throw new \Exception($e->getMessage());
        }
    }

}
