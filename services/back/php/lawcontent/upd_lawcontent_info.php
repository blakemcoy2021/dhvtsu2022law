<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";


    $lawtitle = cleanSqlSave($_POST["lawtitle"]);
    $lawdetails = cleanSqlSave($_POST["lawdetails"]);
    $catid = $_POST["lawcatid"];
    $uid = $_POST["uid"];
    $cnid = $_POST["cnid"];


    // echo "$fname, $mname, $lname, $email, $phone, $addr, $bday, $islaw, $role, $uid"; die();


    $update_str = "law_title='$lawtitle',";
    $update_str .= "law_details='$lawdetails',";
    $update_str .= "law_lawcategoryid='$catid'";
    $query = "update tbl_lawcontent ";
    $query .= "set $update_str ";
    $query .= "where law_id='$cnid' ";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        echo getResponse(true, "Successfully update Law Content #$cnid!", "Law Content #$cnid Updated.");

        $mdl = new ModelLogs();
        $mdl->userid = $uid;
        $mdl->webpage = "lawcontent";
        $mdl->process = "update lawcontent";
        $mdl->receiver = 0;
        $mdl->errlbl .= "admin-audit";
        auditLog($conn, $mdl);

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! upddblawcontent", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>