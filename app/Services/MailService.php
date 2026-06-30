<?php


namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MailService
{
    public function sendGoalCongrats(string $to, string $name, string $goalName, float $percentage)
    {
        $mail = new PHPMailer(true);

        try {

            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;

            $mail->Username = 'giadachiara530@gmail.com';
            $mail->Password = 'bvodooaooydsmbod';

            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->SMTPDebug = 2;
            $mail->Debugoutput = 'html';
            $mail->isSMTP();

            $mail->setFrom('giadachiara530@gmail.com', 'Finance App');
            $mail->addAddress($to);

            $mail->isHTML(false);

            $mail->Subject = "🎯 Obiettivo quasi raggiunto";

            $mail->Body =
                "Ciao $name!

Il tuo obiettivo \"$goalName\" è al $percentage%.

Continua così 💪";

            return $mail->send();
        } catch (Exception $e) {
            echo json_encode([
                "success" => false,
                "error" => $mail->ErrorInfo,
                "exception" => $e->getMessage()
            ]);
            exit;
        }
    }
}