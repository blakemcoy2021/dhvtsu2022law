<?php
    require '../common/dbconfig.php';
    require '../common/utilities.php';
    require '../common/model_login.php';
    require '../common/model_logs.php';

    $dbconn = getConnection();

    $mdl_login = new ModelLogin();
    $mdl_login->username = $_POST["uname"];
    $mdl_login->password = hash('sha256', $_POST["passw"]);

    $isExist = isExist($dbconn, $mdl_login);
    if ($isExist) {
        $id = $_SESSION["userid"];
        $name = $_SESSION["fname"];
        $role = $_SESSION["roleid"];

        $mdl = new ModelLogs();
        $mdl->userid = $id;
        $mdl->webpage = "login";
        $mdl->process = "logging in";
        $mdl->errlbl .= "login-audit";
        auditLog($dbconn, $mdl);

        $streamData = "$id _ $name _ $role";

        echo getResponse($streamData, "You have successfully logged in.", 0);
    }
    else {
        echo getResponse(false, "Invalid Credentials.", 0);
    }

    # stops here

    function isExist($dbconn, $mdl_login) {
        $isExist = false;

        // $query_str = "SELECT COUNT(*) as `total` FROM `tbl_login` WHERE login_username='$mdl_login->username' and login_password='$mdl_login->password';";
        // try {
        //     $statement = $dbconn->prepare($query_str);
        //     $statement->execute();
        //     $total = $statement->fetchColumn();
        //     if($total > 0) {
        //         $isExist = true;
        //     }
        $query_str = "SELECT * FROM `tbl_login` ";
        $query_str .= "inner join `tbl_user` on tbl_login.login_userid=tbl_user.user_id ";
        $query_str .= "WHERE tbl_login.login_username='$mdl_login->username' and tbl_login.login_password='$mdl_login->password';";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
            $rows = $statement->fetchAll();
            if( count($rows) > 0 ) {
                $isExist = true;
                
                session_start();
                $_SESSION["userid"] = $rows[0]["login_userid"];
                $_SESSION["roleid"] = $rows[0]["login_roleid"];
                $_SESSION["fname"] = $rows[0]["user_lastname"] . ", " . $rows[0]["user_firstname"];
            }
        } catch (PDOException $e) {
            return $isExist;
        }

        return $isExist;

    }