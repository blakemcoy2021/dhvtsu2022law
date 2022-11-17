<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $errors = [];
    $data = array();

    $uid = $_GET["uid"];

    date_default_timezone_set('Asia/Singapore');
    $dtupdate = date("Y-m-d G:i:s");
    $query = "update tbl_login set login_verified='2', login_lastupdate='$dtupdate' where login_userid='$uid' ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        echo getResponse(true, "Successfully Requested Re-verification!", "User #$uid Requested.");

        $mdl = new ModelLogs();
        $mdl->userid = $uid;
        $mdl->webpage = "notif";
        $mdl->process = "verify request";
        $mdl->receiver = 0;
        $mdl->errlbl .= "client-audit";
        auditLog($conn, $mdl);

    } catch (PDOException $e) {
        echo getResponse(false, "Server Error! rvdbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>