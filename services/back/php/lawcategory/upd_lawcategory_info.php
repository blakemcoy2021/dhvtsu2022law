<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $errors = [];
    $data = array();

    $catname = cleanSqlSave($_POST["catname"]);
    $catforeword = cleanSqlSave($_POST["catforeword"]);
    $catdetails = cleanSqlSave($_POST["catdetails"]);
    $catid = $_POST["catid"];
    $uid = $_POST["uid"];

    // echo "$fname, $mname, $lname, $email, $phone, $addr, $bday, $islaw, $role, $uid"; die();


    $update_str = "lawcategory_name='$catname',";
    $update_str .= "lawcategory_details1='$catforeword',";
    $update_str .= "lawcategory_details2='$catdetails'";
    $query = "update tbl_lawcategory ";
    $query .= "set $update_str ";
    $query .= "where lawcategory_id='$catid' ";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        echo getResponse(true, "Successfully update Law Category #$catid!", "Law Category #$catid Updated.");

        $mdl = new ModelLogs();
        $mdl->userid = $uid;
        $mdl->webpage = "lawcat";
        $mdl->process = "update lawcat";
        $mdl->receiver = 0;
        $mdl->errlbl .= "admin-audit";
        auditLog($conn, $mdl);

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! upddblawcat", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>