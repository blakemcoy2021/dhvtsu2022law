<?php

function getConnection()
{
    $hostname = "localhost";
    $database = "lawyerfinder_db";
    $conn_str = "mysql:host=$hostname;dbname=$database;";

    $username = "root";
    $password = "root";

    $dbconn = new PDO($conn_str, $username, $password);
    $dbconn-> setAttribute(PDO ::ATTR_ERRMODE, PDO :: ERRMODE_EXCEPTION);
    return $dbconn;
}


