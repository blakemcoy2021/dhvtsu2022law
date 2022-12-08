<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $appid = $_GET["appid"];
    $msg = $_GET["msg"];


    $query = "update tbl_appointment set app_status='$msg' where app_id='$appid' ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        echo getResponse(true, "Successfully Updated Appointment!", "Appointment Updated.");

        $mdl = new ModelLogs();
        $mdl->userid = 0;
        $mdl->webpage = "appointment";
        $mdl->process = "appointment options";
        $mdl->receiver = 0;
        $mdl->errlbl .= "client/lawyer-audit";
        auditLog($conn, $mdl);

    } catch (PDOException $e) {
        echo getResponse(false, "Server Error! vdbappoint", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>