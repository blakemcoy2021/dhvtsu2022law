<?php
    require '../common/dbconfig.php';
    require '../common/utilities.php';
    require '../common/model_law.php';
    require '../common/model_logs.php';

    $dbconn = getConnection();

    $mdl_law = new ModelLawContent();
    $mdl_law->name = cleanSqlSave($_POST["lawtitle"]);
    $mdl_law->details = cleanSqlSave($_POST["lawdetails"]);
    $mdl_law->catid = $_POST["lawcatid"];
    $uid = $_POST["uid"];

    $isExist = isExist($dbconn, $mdl_law);
    register($dbconn, $mdl_law, $isExist);

    $mdl = new ModelLogs();
    $mdl->userid = $uid;
    $mdl->webpage = "lawcontent";
    $mdl->process = "add";
    $mdl->errlbl .= "admin-audit";
    auditLog($dbconn, $mdl);
    die();


    # stops here

    function isExist($dbconn, $mdl_law)
    {
        $isExist = false;

        $query_str = "SELECT COUNT(*) as `total` FROM `tbl_lawcontent` WHERE law_title='$mdl_law->name';";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
            $total = $statement->fetchColumn();

            if($total > 0) {
                $isExist = true;
            }

        } catch (PDOException $e) {
            return $isExist;
        }

        return $isExist;
    }

    function register($dbconn, $mdl_login, $isExist)
    {
        if ($isExist) {
            echo getResponse(false, "Adding failed: Law Content already exist.", 0);
            return;
        }
        $mdl = $mdl_login;
        $tblname = "tbl_lawcontent";
        $fld = "law_";
        $fld1 = $fld . "title";
        $fld2 = $fld . "details";
        $fld3 = $fld . "lawcategoryid";
        $fld4 = $fld . "photo";
        $fld5 = $fld . "attachfile";
        $query_str = "INSERT INTO `$tblname` (`$fld1`,`$fld2`,`$fld3`,`$fld4`,`$fld5`) ";
        $query_str .= "VALUES ('$mdl->name','$mdl->details','$mdl->catid','$mdl->photo','$mdl->attach');";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
        } catch (PDOException $e) { echo getResponse(false, "failed @ law contents : $e", -1); return; }
        $lawId = getLastId($dbconn, $tblname, 'law_id');


        // echo "You have successfully Registered!";
        echo getResponse(true, "You have successfully added law content!", $lawId);

    }





