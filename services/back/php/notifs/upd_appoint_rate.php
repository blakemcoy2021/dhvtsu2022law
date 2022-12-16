<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $appId = $_GET["appId"];
    $rate = $_GET["rate"];
    $comment = $_GET["comment"];

    $query = "update tbl_rating ";
    $query .= "inner join tbl_appointment on tbl_rating.rating_id=tbl_appointment.app_ratingid ";
    $query .= "set tbl_rating.rating_value='$rate', tbl_rating.rating_comment='$comment' ";
    $query .= "where tbl_appointment.app_id='$appId' ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        echo getResponse(true, "Successfully Rated Lawyer's Appointment Experience!", "Rate Success.");

        $query = "select * from tbl_appointment where app_id='$appId' ";
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch();
        $poster = $row["app_userid"];
        $lawyerid = $row["app_lawyerid"];

        $query = "select * from tbl_lawyer where lawyer_id='$lawyerid' ";
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch();
        $reader = $row["lawyer_userid"];


        $mdl = new ModelLogs();
        $mdl->userid = $poster;
        $mdl->webpage = "notif";
        $mdl->process = "appointment rate $appId";
        $mdl->receiver = $reader;
        $mdl->errlbl .= "client-audit";
        auditLog($conn, $mdl);

    } catch (PDOException $e) {
        echo getResponse(false, "Server Error! rvdbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>