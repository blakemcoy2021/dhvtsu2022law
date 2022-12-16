<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $appid = $_GET["appid"];
    $msg = $_GET["msg"];
    $luid = $_GET["luid"];

    $query = "update tbl_appointment set app_status='$msg' where app_id='$appid' ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        echo getResponse(true, "Successfully Updated Appointment!", "Appointment Updated.");

        $query = "select * from tbl_appointment where app_id='$appid' ";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch();
        $clientid = $row["app_userid"];
        $lawyerid = $row["app_lawyerid"];

        $tag = "client";
        $poster = 0;
        $reader = 0;
        if ($msg == "done" || $msg == "decline") {
            $poster = $luid;
            $reader = $clientid;
            $tag = "lawyer";
        }
        else if ($msg == "cancel") {
            $poster = $clientid; // luid
            $query = "select * from tbl_lawyer ";
            $query .= "where lawyer_id='$lawyerid' ";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $row = $stmt->fetch();
            $reader = $row["lawyer_userid"];
        }

        $mdl = new ModelLogs();
        $mdl->userid = $poster;
        $mdl->webpage = "appointment";
        $mdl->process = "appointment update $msg $appid";
        $mdl->receiver = $reader;
        $mdl->errlbl .= "$tag-audit";
        auditLog($conn, $mdl);

    } catch (PDOException $e) {
        echo getResponse(false, "Server Error! vdbappoint", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>