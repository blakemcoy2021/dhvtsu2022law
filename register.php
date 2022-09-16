<?php
require 'db.php';
require 'userModel.php';



$dbconn = getConnection();

$userModel = new UserModel();
$userModel->firstname = $_POST["firstname"];
$userModel->email = $_POST["email"];
$userModel->password = hash('sha256', $_POST["password"]);

echo $userModel->firstname;



$isExist = isExist($dbconn, $userModel); //gagamitan
register($dbconn, $userModel, $isExist);

# stops here


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

function register($dbconn, $userModel, $isExist)
{
    if( $isExist ) {
        echo "Signup failed: User already exist.";
        return;
    }

    $query_str = "INSERT INTO `m_user` (`first_name`,`username`,`password`) 
    VALUES ( '$userModel->firstname','$userModel->email','$userModel->password');";
    //echo $query_str;
    try {
        $statement = $dbconn->prepare($query_str);
        $statement->execute();

        echo "SUCCESSFULLY REGITERED USERNAME: $userModel->email PASSWORD: $userModel->password  SECRET: $userModel->firstname";
    } catch (PDOException $e) {
        echo "failed $e";
    }
}