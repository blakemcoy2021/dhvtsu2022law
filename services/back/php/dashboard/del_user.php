<?php
    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $errors = [];
    $data = array();

    $uid = $_GET["uid"];
    $id = $_GET["id"];

    /** below does not work for php query but requires confirmation when in phpmyadmin : bulk deletion */
    // $query = "delete from tbl_user ";
    // $query .= "inner join tbl_contact on tbl_user.user_contactid=tbl_contact.contact_id ";
    // $query .= "inner join tbl_login on tbl_user.user_id=tbl_login.login_userid ";
    // $query .= "inner join tbl_lawyer on tbl_user.user_id=tbl_lawyer.lawyer_userid ";
    // $query .= "inner join tbl_days on tbl_lawyer.lawyer_daysid=tbl_days.days_id ";
    // $query .= "where tbl_user.user_id='$uid' ";

    try {
        $conn = getConnection();

        $contactId = getId($conn, 'tbl_contact', 'contact_id', 'tbl_user', 'user_contactid', $uid, 'user_id', true);
        if (is_int($contactId)) { echo getResponse(false, "failed select @ contact : $contactId", -1); return; }
        $respo = delId($conn, 'tbl_contact', 'contact_id', $contactId);
        if ($respo != true) { echo getResponse(false, "failed deletion @ contact : $respo", -1); return; }
 
        $respo = delId($conn, 'tbl_login', 'login_userid', $uid);
        if ($respo != true) { echo getResponse(false, "failed deletion @ login : $respo", -1); return; }

        $daysId = getId($conn, 'tbl_lawyer', 'lawyer_daysid', 'tbl_days', 'days_id', $uid, 'lawyer_userid');
        if (is_int($daysId)) { echo getResponse(false, "failed select @ days : $daysId", -1); return; }
        $respo = delId($conn, 'tbl_days', 'days_id', $daysId);
        if ($respo != true) { echo getResponse(false, "failed deletion @ days : $respo", -1); return; }

        $respo = delId($conn, 'tbl_lawyer', 'lawyer_userid', $uid);
        if ($respo != true) { echo getResponse(false, "failed deletion @ lawyer : $respo", -1); return; }

        $respo = delId($conn, 'tbl_user', 'user_id', $uid);
        if ($respo != true) { echo getResponse(false, "failed deletion @ user : $respo", -1); return; }

        echo getResponse(true, "Successfully Deleted User #$uid!", "User #$uid deleted.");

        $mdl = new ModelLogs();
        $mdl->userid = $id;
        $mdl->webpage = "admin";
        $mdl->process = "delete user#$uid";
        $mdl->receiver = $uid;
        $mdl->errlbl .= "admin-audit";
        auditLog($conn, $mdl);

    } catch (PDOException $e) {
        echo getResponse(false, "Server Error! deldbuser", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>