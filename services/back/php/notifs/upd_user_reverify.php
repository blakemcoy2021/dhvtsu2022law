<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $errors = [];
    $data = array();

    $uid = $_GET["uid"];
    $roleid = $_GET["role"];

    date_default_timezone_set('Asia/Singapore');
    $dtupdate = date("Y-m-d G:i:s");
    $query = "update tbl_login set login_verified='2', login_lastupdate='$dtupdate' where login_userid='$uid' ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        echo getResponse(true, "Successfully Requested Re-verification!", "User #$uid Requested.");

        $msgtyp = "request";
        $msgusr = "client";
        if ($roleid == 3) {
            $msgtyp = "lawrequest";
            $msgusr = "lawyer";
        }
        $mdl = new ModelLogs();
        $mdl->userid = $uid;
        $mdl->webpage = "notif";
        $mdl->process = "verify $msgtyp";
        $mdl->receiver = 0;
        $mdl->errlbl .= "$msgusr-audit";
        auditLog($conn, $mdl);

    } catch (PDOException $e) {
        echo getResponse(false, "Server Error! rvdbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>