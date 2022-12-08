<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $luid = $_GET["luid"];
    $roleid = $_GET["roleid"];
    
    $query = "select * from tbl_appointment ";
    if ($roleid == "3") {
        $query .= "inner join tbl_lawyer on tbl_appointment.app_lawyerid=tbl_lawyer.lawyer_id ";
        $query .= "inner join tbl_login on tbl_lawyer.lawyer_userid=tbl_login.login_userid ";
    }
    else if ($roleid == "2") {
        $query .= "inner join tbl_login on tbl_appointment.app_userid=tbl_login.login_userid ";
    }
    $query .= "where tbl_login.login_id='$luid' ";
    $query .= "order by app_datesched desc, app_timesched desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $results = $stmt->fetchAll();

        echo getResponse(json_encode($results), "Successfully retrieved appointments", "Appointment(s) Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dbapp", "Database Exception - " . $e->getMessage());

    }
    $conn = null;
