<?php

    require '../common/dbconfig.php';
    require '../common/utilities.php';
    require '../common/model_logs.php';

    $page = $_GET["page"];

    $dbconn = getConnection();

    session_start();
    $mdl = new ModelLogs();
    $mdl->userid = $_SESSION["userid"];
    $mdl->webpage = $page;
    $mdl->process = "logout";
    $mdl->errlbl .= "$page-audit";
    auditLog($dbconn, $mdl);
