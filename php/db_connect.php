<?php

$host = "localhost";
$username = "root";
$password = "";
$dbname = "cinema";

try {
    //? Je crée une connexion à ma base de données avec les différents paramètres
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
} catch (ErrorException $e) {
    echo $e;
}
