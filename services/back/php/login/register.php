<?php
    require '../common/dbconfig.php';
    require '../common/model_login.php';
    require '../common/model_user.php';
    require '../common/model_contact.php';
    require '../common/model_role.php';

    $dbconn = getConnection();

    $mdl_login = new ModelLogin();
    $mdl_login->username = $_POST["username"];
    $mdl_login->password = hash('sha256', $_POST["password"]);

    $mdl_contact = new ModelContact();
    $mdl_contact->email = $_POST["email"];

    $isExist = isExist($dbconn, $mdl_login);
    register($dbconn, $mdl_login, $mdl_contact, $isExist);
    die();


    # stops here

    function isExist($dbconn, $mdl_login)
    {
        $isExist = false;

        $query_str = "SELECT COUNT(*) as `total` FROM `tbl_login` WHERE username='$mdl_login->username';";
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

    function register($dbconn, $mdl_login, $mdl_contact, $isExist)
    {
        if ($isExist) {
            echo "Signup failed: User already exist.";
            return;
        }

        $tblname = "tbl_contact";
        $query_str = "INSERT INTO `$tblname` (`contact_phone`,`contact_email`,`contact_address`) ";
        $query_str .= "VALUES ('$mdl_contact->phone','$mdl_contact->email','$mdl_contact->address');";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
        } catch (PDOException $e) { echo "failed @ contacts : $e"; return; }
        $contactId = getId($dbconn, $tblname, 'contact_id');

        $mdl = new ModelUser();
        $tblname = "tbl_user";
        $query_str = "INSERT INTO `$tblname` (`user_firstname`,`user_midname`,`user_lastname`,`user_birthdate`,`user_photo`,`user_validid`,`user_contactid`) ";
        $query_str .= "VALUES ('$mdl->firstname','$mdl->midname','$mdl->lastname','$mdl->birthdate','$mdl->photo','$mdl->validId','$contactId');";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
        } catch (PDOException $e) { echo "failed @ user : $e"; return; }
        $userId = getId($dbconn, $tblname, 'user_id');

        $mdl = $mdl_login;
        $tblname = "tbl_login";
        $query_str = "INSERT INTO `$tblname` (`login_username`,`login_password`,`login_userid`,`login_verified`,`login_roleid`) ";
        $query_str .= "VALUES ('$mdl->username','$mdl->password','$userId','$mdl->verified','$mdl->roleId');";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
        } catch (PDOException $e) { echo "failed @ login : $e"; return; }

        echo "You have successfully Registered!";

    }

    function getId($dbconn, $tbl, $idname)
    {
        $tbl_id = 0;

        $query_str = "SELECT `$idname` FROM `$tbl` order by `$idname` desc limit 1";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
            $fetch_id = $statement->fetchColumn();

            if($fetch_id > 0) {
                $tbl_id = $fetch_id;
            }

        } catch (PDOException $e) {
            return $tbl_id;
        }

        return $tbl_id;
    }



