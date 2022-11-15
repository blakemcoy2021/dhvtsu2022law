<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $errors = [];
    $data = array();

    $uid = $_GET["uid"];
    $vfy = $_GET["vfy"];
    $id = $_GET["id"];

    $query = "update tbl_login set login_verified='$vfy' where login_userid='$uid' ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        $msg = "Verified";
        if ($vfy == -1) {
            $msg = "Declined";
        }
        echo getResponse(true, "Successfully $msg User #$uid!", "User #$uid $msg.");

        $mdl = new ModelLogs();
        $mdl->userid = $id;
        $mdl->webpage = "admin";
        $mdl->process = "verify " . strtolower($msg);
        $mdl->receiver = $uid;
        $mdl->errlbl .= "admin-audit";
        auditLog($conn, $mdl);

    } catch (PDOException $e) {
        echo getResponse(false, "Server Error! vdbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>