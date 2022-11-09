<?php

    require '../common/dbconfig.php';

    $user = $_POST["user"];
    $pass = hash('sha256', $_POST["pass"]);

    $query_str = "SELECT * FROM tbl_login where login_username='$user' and login_password='$pass'";

    try {

        $statement = getConnection()->prepare($query_str);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $statement->execute();
        $rows = $statement->fetchAll();
        $rowctr = count($rows);
        $isNoResult = $rowctr < 1;

        if ($isNoResult) {
            echo "login fail";
            
        } else {
            echo "login success";
        }

    } catch (PDOException $e) {
        echo "failed $e";

    }
