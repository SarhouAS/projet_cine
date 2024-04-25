<?php

session_start();
error_reporting(-1);

require_once("./db_connect.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode(["success" => false, "error" => "Mauvaise methode"]);
    die;
}

if (!isset($_POST["firstname"], $_POST["lastname"], $_POST["email"], $_SESSION["pwd"], $_POST["city"], $_POST["country"])) {

    echo json_encode(["success" => false, "error" =>  "Missing data"]);
    die;
}

if(
    empty(trim($_POST["firstname"])) ||
    empty(trim($_POST["lastname"])) ||
    empty(trim($_POST["email"])) ||
    empty(trim($_POST["pwd"])) ||
    empty(trim($_POST["city"])) ||
    empty(trim($_POST["country"]))  
    
) {
    echo json_encode(["success" => false, "error" => "Données vides"]);
    die;
}

$regex = "/^[a-zA-Z0-9-+._]+@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}$/";

if (!preg_match($regex, $_POST["email"])) {
    echo json_encode(["success" => false, "error" => "email  au mauvais format"]);
    die;
}

$regex = "/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{8,12}$/";

if (!preg_match($regex, $_POST["pwd"])) {

    echo json_encode(["success" => false, "error" => "Mot de passe au mauvais format"]);
    die;
}

$hash = password_hash($_POST["pwd"], PASSWORD_DEFAULT);

$req = $db->prepare("INSERT INTO client(firstname, lastname, email, pwd, city, country) VALUES (:firstname, :lastname, :email, :pwd, :city, :country)");

$req->bindValue(":firstname", $_POST["firstname"]);
$req->bindValue(":lastname", $_POST["lastname"]);
$req->bindValue(":email", $_POST["email"]);
$req->bindValue(":pwd", $hash);
$req->bindValue(":city", $_POST["city"]);
$req->bindValue(":country", $_POST["country"]);
$req->execute();

if ($req->rowCount()) echo json_encode(["success" => true]);
else echo json_encode(["success" => false, "error" => "Mail deja existant"]);
