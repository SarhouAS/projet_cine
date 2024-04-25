<?php
error_reporting(-1);

session_start();

require_once("./db_connect.php");

if (!isset($_POST["email"], $_POST["pwd"])) {
    echo json_encode(["success" => false, "error" => "Données manquantes"]);
    die;
}

if (empty(trim($_POST["email"])) || empty(trim($_POST["pwd"]))) {
    echo json_encode(["success" => false, "error" => "Champs vide"]);
    die;
}

$req = $db->prepare("SELECT * From client WHERE email = ?");
$req->execute([$_POST["email"]]);

$client = $req->fetch(PDO::FETCH_ASSOC);

if ($client && password_verify($_POST["pwd"], $client["password"])) {
    $_SESSION["connected"] = true ;
    $_SESSION["client_id"] = $client["id"];

    unset($client["pwd"]);

    echo json_encode(["sucsess" => true, "client0, => $client"]);
} else {
    $_SESSION = [];
    session_destroy();
    
    echo json_encode(["success" => false, "error" => "Aucun utilisateur"]);
}