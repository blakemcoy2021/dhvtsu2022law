<?php

function getConnection()
{
    $hostname = "localhost";
    $database = "2022itdhvtsu_lawfinder";
    $conn_str = "mysql:host=$hostname;dbname=$database;";

    $username = "root";
    $password = "toor"; //ActivPower@123L

    $dbconn = new PDO($conn_str, $username, $password);
    $dbconn-> setAttribute(PDO ::ATTR_ERRMODE, PDO :: ERRMODE_EXCEPTION);
    return $dbconn;
}


