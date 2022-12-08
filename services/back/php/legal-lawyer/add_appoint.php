<?php
    require '../common/dbconfig.php';
    require '../common/utilities.php';
    require '../common/model_appoint.php';
    require '../common/model_logs.php';


    $dbconn = getConnection();

    $mdl_appoint = new ModelAppointment();
    $mdl_appoint->tmschd = $_POST["startT"];
    $mdl_appoint->lawyId = $_POST["lawId"];
    $mdl_appoint->userid = $_POST["uid"];
    $mdl_appoint->dtschd = $_POST["dtsched"];
    $mdl_appoint->remarks = $_POST["reason"];

    $isExist = isExist($dbconn, $mdl_appoint);
    register($dbconn, $mdl_appoint, $isExist);

    $mdl = new ModelLogs();
    $mdl->userid = $mdl_appoint->userid;
    $mdl->webpage = "appoint";
    $mdl->process = "add";
    $mdl->errlbl .= "client-audit";
    auditLog($dbconn, $mdl);
    die();


    # stops here

    function isExist($dbconn, $mdl_appoint)
    {
        $isExist = false;

        $query_str = "SELECT COUNT(*) as `total` FROM `tbl_appointment` ";
        $query_str .= "WHERE app_datesched='$mdl_appoint->dtschd' and app_timesched='$mdl_appoint->tmschd';";
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

    function register($dbconn, $mdl_appoint, $isExist)
    {
        if ($isExist) {
            echo getResponse(false, "Appointment failed: Appointment Schedule already exist.", 0);
            return;
        }

        $tbl= "tbl_rating";
        $query_str = "insert into $tbl (`rating_userid`,`rating_value`,`rating_comment`,`rating_lawyerid`) ";
        $query_str .= "values ($mdl_appoint->userid,0,'n/a',$mdl_appoint->lawyId);";

        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
        } catch (PDOException $e) { echo getResponse(false, "failed @ appointment : $e", -1); return; }
        $ratingId = getLastId($dbconn, $tbl, 'rating_id');


        $mdl = $mdl_appoint;
        $tbl = "tbl_appointment";
        $fld = "app_";
        $fld1 = $fld . "userid";
        $fld2 = $fld . "lawyerid";
        $fld3 = $fld . "datesched";
        $fld4 = $fld . "timesched";
        $query_str = "INSERT INTO `$tbl` (`$fld1`,`$fld2`,`$fld3`,`$fld4`,`app_status`,`app_remarks`,`app_ratingid`) ";
        $query_str .= "VALUES ($mdl->userid,$mdl->lawyId,'$mdl->dtschd','$mdl->tmschd','unverified','$mdl->remarks',$ratingId);";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
        } catch (PDOException $e) { echo getResponse(false, "failed @ appointment : $e", -1); return; }
        $appointId = getLastId($dbconn, $tbl, 'app_id');


        // echo "You have successfully Registered!";
        echo getResponse(true, "You have successfully added appointment", $appointId);

    }





