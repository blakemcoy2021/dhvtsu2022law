<?php
require 'db.php';

$user = $_POST["user"];
$pass = hash('sha256', $_POST["pass"]);


$query_str = "SELECT * FROM m_user where username='$user' and  password ='$pass'";
try {

    $statement = getConnection()->prepare($query_str);
    $statement->setFetchMode(PDO::FETCH_ASSOC);
    $statement->execute();
    $abc = $statement->fetchAll();
    $qwe = count($abc);
    $han = $qwe < 1;

    if ($han) {
        echo "username not found!";
        die();
    } else {
        echo "login success to !";
    }
} catch (PDOException $e) {
    echo "failed $e";
}
