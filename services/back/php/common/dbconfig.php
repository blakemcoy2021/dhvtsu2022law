<?php

function getConnection()
{
    $hostname = "localhost";
    $database = "2022itdhvtsu_lawfinder";
    $conn_str = "mysql:host=$hostname;dbname=$database;";

    $username = "root";
    // $password = "toor"; //ActivPower@123L
    $password = "ActivPower@123L";

    /**
     * sudo chown www-data:www-data /var/www/html
     * sudo chmod -R 775 /var/www/html
     * sudo chown -R www-data:www-data /var/www/html/data
     * 
    */

    $dbconn = new PDO($conn_str, $username, $password);
    $dbconn-> setAttribute(PDO ::ATTR_ERRMODE, PDO :: ERRMODE_EXCEPTION);
    return $dbconn;
}


