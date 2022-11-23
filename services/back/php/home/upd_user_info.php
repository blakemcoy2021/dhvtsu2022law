<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $errors = [];
    $data = array();

    $fname = $_POST["fname"];
    $mname = $_POST["mname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $addr = $_POST["addr"];
    $bday = $_POST["bday"];
    $islaw = $_POST["islaw"];

    $lawcatg = "0";
    $lawaddr = "n/a";
    $lawopen = "00:00:00";
    $lawclos = "00:00:00";
    $lawdays = "n/a";

    $role = 2;
    if ($islaw == "true") {
        $role = 3;
        $lawcatg = $_POST["lawcatg"];
        $lawaddr = $_POST["lawaddr"];
        $lawopen = $_POST["lawopen"];
        $lawclos = $_POST["lawclos"];
        $lawdays = $_POST["lawdays"];
    }
    $uid = $_POST["uid"];

    // echo "$fname, $mname, $lname, $email, $phone, $addr, $bday, $islaw, $role, $uid"; die();


    $update_str = "tbl_user.user_firstname='$fname',";
    $update_str .= "tbl_user.user_midname='$mname',";
    $update_str .= "tbl_user.user_lastname='$lname',";
    $update_str .= "tbl_contact.contact_email='$email',";
    $update_str .= "tbl_contact.contact_phone='$phone',";
    $update_str .= "tbl_contact.contact_address='$addr',";
    $update_str .= "tbl_user.user_birthdate='$bday',";
    $update_str .= "tbl_login.login_roleid='$role'";
    $query = "update tbl_user ";
    $query .= "inner join tbl_contact on tbl_user.user_contactid=tbl_contact.contact_id ";
    $query .= "inner join tbl_login on tbl_user.user_id=tbl_login.login_userid ";
    $query .= "set $update_str ";
    $query .= "where tbl_user.user_id='$uid' ";

    $msgtyp = "client";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        if ($role == 3) {
            $update_str = "tbl_lawyer.lawyer_lawcatid='$lawcatg',";
            $update_str .= "tbl_lawyer.lawyer_mapaddr=\"" .$lawaddr ."\",";
            $update_str .= "tbl_lawyer.lawyer_opentime='$lawopen:00',";
            $update_str .= "tbl_lawyer.lawyer_closetime='$lawclos:00',";
            $update_str .= "tbl_login.login_verified='2',";
            
            $daysArr = explode(",",$lawdays);
            $daysNameArr = array("issun","ismon","istue","iswed","isthu","isfri","issat");
            $stream_values = "";
            for ($x = 0; $x < sizeof($daysArr); $x++) {
                $stream_values .= "tbl_days.days_" . $daysNameArr[$x] . "='" . $daysArr[$x] . "'";
                if ($x != (sizeof($daysArr) - 1)) {
                    $stream_values .= ",";
                }
            }
            $update_str .= $stream_values;
            $query = "update tbl_lawyer ";
            $query .= "inner join tbl_login on tbl_lawyer.lawyer_userid=tbl_login.login_userid ";
            $query .= "inner join tbl_days on tbl_lawyer.lawyer_daysid=tbl_days.days_id ";
            $query .= "set $update_str ";
            $query .= "where tbl_lawyer.lawyer_userid='$uid' ";

            $msgtyp = "lawyer";
            $stmt = $conn->prepare($query);
            $stmt->execute();
        }

        echo getResponse(true, "Successfully update User #$uid!", "User #$uid Updated.");

        $mdl = new ModelLogs();
        $mdl->userid = $uid;
        $mdl->webpage = "home";
        $mdl->process = "update $msgtyp";
        $mdl->receiver = 0;
        $mdl->errlbl .= "user-audit";
        auditLog($conn, $mdl);

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! upddbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>