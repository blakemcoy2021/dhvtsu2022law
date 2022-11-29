<?php

    require '../common/dbconfig.php';
    require '../common/utilities.php';
    require '../common/model_logs.php';

    $page = $_GET["page"];
    $uid = $_GET["uid"];

    $dbconn = getConnection();

    session_start();
    if (isset($_SESSION['userid']) && !empty($_SESSION['userid'])) {
        $uid = $_SESSION["userid"];
    }
    $mdl = new ModelLogs();
    $mdl->userid = $uid;
    $mdl->webpage = $page;
    $mdl->process = "logout";
    $mdl->errlbl .= "$page-audit";
    auditLog($dbconn, $mdl);
