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

$req = $db->prepare("SELECT * From user WHERE email = ?");
$req->execute([$_POST["email"]]);

$user = $req->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($_POST["pwd"], $user["password"])) {
    $_SESSION["connected"] = true ;
    $_SESSION["user_id"] = $user["id"];

    unset($user["pwd"]);

    echo json_encode(["sucsess" => true, "user0, => $user"]);
} else {
    $_SESSION = [];
    session_destroy();
    
    echo json_encode(["success" => false, "error" => "Aucun utilisateur"]);
}