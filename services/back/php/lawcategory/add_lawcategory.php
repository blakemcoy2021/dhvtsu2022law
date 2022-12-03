<?php
    require '../common/dbconfig.php';
    require '../common/utilities.php';
    require '../common/model_lawcat.php';
    require '../common/model_logs.php';

    $dbconn = getConnection();

    $mdl_lawcat = new ModelLawCategory();
    $mdl_lawcat->name = cleanSqlSave($_POST["catname"]);
    $mdl_lawcat->foreword = cleanSqlSave($_POST["catforeword"]);
    $mdl_lawcat->details = cleanSqlSave($_POST["catdetails"]);
    $uid = $_POST["uid"];

    $isExist = isExist($dbconn, $mdl_lawcat);
    register($dbconn, $mdl_lawcat, $isExist);

    $mdl = new ModelLogs();
    $mdl->userid = $uid;
    $mdl->webpage = "lawcat";
    $mdl->process = "add";
    $mdl->errlbl .= "admin-audit";
    auditLog($dbconn, $mdl);
    die();


    # stops here

    function isExist($dbconn, $mdl_lawcat)
    {
        $isExist = false;

        $query_str = "SELECT COUNT(*) as `total` FROM `tbl_lawcategory` WHERE lawcategory_name='$mdl_lawcat->name';";
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
            echo getResponse(false, "Adding failed: Law Category already exist.", 0);
            return;
        }
        $mdl = $mdl_login;
        $tblname = "tbl_lawcategory";
        $fld = "lawcategory_";
        $fld1 = $fld . "name";
        $fld2 = $fld . "photo";
        $fld3 = $fld . "cover";
        $fld4 = $fld . "details1";
        $fld5 = $fld . "details2";
        $query_str = "INSERT INTO `$tblname` (`$fld1`,`$fld2`,`$fld3`,`$fld4`,`$fld5`) ";
        $query_str .= "VALUES ('$mdl->name','$mdl->photo','$mdl->cover','$mdl->foreword','$mdl->details');";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
        } catch (PDOException $e) { echo getResponse(false, "failed @ law category : $e", -1); return; }
        $lawcatId = getLastId($dbconn, $tblname, 'lawcategory_id');


        // echo "You have successfully Registered!";
        echo getResponse(true, "You have successfully added law category!", $lawcatId);

    }





