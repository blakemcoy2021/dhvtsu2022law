<?php
    require '../common/dbconfig.php';
    require '../common/utilities.php';
    require '../common/model_lawfield.php';
    require '../common/model_logs.php';

    $dbconn = getConnection();

    $mdl_lawfld = new ModelLawField();
    $mdl_lawfld->name = $_POST["fldname"];
    $mdl_lawfld->catid = $_POST["fldcatid"];
    $mdl_lawfld->tags = $_POST["fldtags"];
    $uid = $_POST["uid"];

    $isExist = isExist($dbconn, $mdl_lawfld);
    register($dbconn, $mdl_lawfld, $isExist);

    $mdl = new ModelLogs();
    $mdl->userid = $uid;
    $mdl->webpage = "lawfld";
    $mdl->process = "add";
    $mdl->errlbl .= "admin-audit";
    auditLog($dbconn, $mdl);
    die();


    # stops here

    function isExist($dbconn, $mdl_lawfld)
    {
        $isExist = false;

        $query_str = "SELECT COUNT(*) as `total` FROM `tbl_lawfield` WHERE lawfield_name='$mdl_lawfld->name';";
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

    function register($dbconn, $mdl_lawfld, $isExist)
    {
        if ($isExist) {
            echo getResponse(false, "Adding failed: Law Field already exist.", 0);
            return;
        }
        $mdl = $mdl_lawfld;
        $tblname = "tbl_lawfield";
        $fld = "lawfield_";
        $fld1 = $fld . "name";
        $fld2 = $fld . "categoryid";
        $fld3 = $fld . "tags";
        $query_str = "INSERT INTO `$tblname` (`$fld1`,`$fld2`,`$fld3`) ";
        $query_str .= "VALUES ('$mdl->name','$mdl->catid','$mdl->tags');";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
        } catch (PDOException $e) { echo getResponse(false, "failed @ law field : $e", -1); return; }
        $lawfldId = getLastId($dbconn, $tblname, 'lawfield_id');


        // echo "You have successfully Registered!";
        echo getResponse(true, "You have successfully added law field!", $lawfldId);

    }





