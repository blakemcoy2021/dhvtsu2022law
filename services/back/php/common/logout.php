<?php

    require '../common/dbconfig.php';
    require '../common/utilities.php';
    require '../common/model_logs.php';

    $dbconn = getConnection();

    session_start();
    $mdl = new ModelLogs();
    $mdl->userid = $_SESSION["userid"];
    $mdl->webpage = "admin";
    $mdl->process = "logout";
    $mdl->errlbl .= "admin-audit";
    auditLog($dbconn, $mdl);
