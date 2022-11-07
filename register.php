<?php
require 'db.php';
require 'userModel.php';



$dbconn = getConnection();

$userModel = new UserModel();
$userModel->firstname = $_POST["firstname"];
$userModel->email = $_POST["email"];
$userModel->password = hash('sha256', $_POST["password"]);




$isExist = isExist($dbconn, $userModel); //gagamitan
register($dbconn, $userModel, $isExist);

# stops here

function register($dbconn, $userModel, $isExist)
{
    if( $isExist ) {
        echo "Signup failed: User already exist.";
        return;
    }else{
        echo "Register Success";
    }

    $query_str = "INSERT INTO `m_user` (`first_name`,`username`,`password`) 
    VALUES ( '$userModel->firstname','$userModel->email','$userModel->password');";
    //echo $query_str;
    try {
        $statement = $dbconn->prepare($query_str);
        $statement->execute();

    } catch (PDOException $e) {
        echo "failed $e";
    }
}

function isExist($dbconn, $userModel) //megawa
{
    $isExist = false;

    $query_str = "SELECT COUNT(*) as `total` FROM `m_user` WHERE username= '$userModel->email';";
    try {
        $statement = $dbconn->prepare($query_str);
        $statement->execute();
        $total = $statement->fetchColumn();

        if($total > 0) {
            $isExist = true;
        }

    } catch (PDOException $e) {
        return $isExist;
    }

    return $isExist;
}

