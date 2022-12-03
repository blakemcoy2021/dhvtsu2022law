<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $fldname = cleanSqlSave($_POST["fldname"]);
    $flddesc = cleanSqlSave($_POST["flddesc"]);
    $fldcatid = $_POST["fldcatid"];
    $fldtags = cleanSqlSave($_POST["fldtags"]);
    $fldid = $_POST["fldid"];
    $uid = $_POST["uid"];

    // echo "$fname, $mname, $lname, $email, $phone, $addr, $bday, $islaw, $role, $uid"; die();


    $update_str = "lawfield_name='$fldname',";
    $update_str .= "lawfield_details='$flddesc',";
    $update_str .= "lawfield_categoryid='$fldcatid',";
    $update_str .= "lawfield_tags='$fldtags'";
    $query = "update tbl_lawfield ";
    $query .= "set $update_str ";
    $query .= "where lawfield_id='$fldid' ";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        echo getResponse(true, "Successfully update Law Field #$fldid!", "Law Field #$fldid Updated.");

        $mdl = new ModelLogs();
        $mdl->userid = $uid;
        $mdl->webpage = "lawfld";
        $mdl->process = "update lawfld";
        $mdl->receiver = 0;
        $mdl->errlbl .= "admin-audit";
        auditLog($conn, $mdl);

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! upddblawfld", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>