<?php

    function cleanSqlSave($str) {
        return str_replace("'","",$str);
    }

    function getResponse($state, $msg, $d) {
        $data = array();
        $data['success'] = $state;
        $data['message'] = $msg;
        $data['data'] = $d;
        return json_encode($data);
    }
 
    function getLastId($dbconn, $tbl, $idname)
    {
        $tbl_id = 0;

        $query_str = "SELECT `$idname` FROM `$tbl` order by `$idname` desc limit 1";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
            $fetch_id = $statement->fetchColumn();

            if($fetch_id > 0) {
                $tbl_id = $fetch_id;
            }

        } catch (PDOException $e) {
            return $tbl_id;
        }

        return $tbl_id;
    }

    function getId($dbconn, $tbl1, $idname1, $tbl2, $idname2, $val, $idname3 = "", $mode = false)
    {
        $tbl_ids = 0;

        $query_str = "SELECT $tbl1.`$idname1` FROM `$tbl1` ";
        if ($tbl2 != "") {
            $query_str .= "inner join $tbl2 on $tbl1.$idname1=$tbl2.$idname2 ";
        }

        if ($idname3 != "") {
            if ($mode) {
                $query_str .= " where $tbl2.`$idname3`='$val' ";
            }
            else {
                $query_str .= " where $tbl1.`$idname3`='$val' ";
            }
        }

        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
            $row = $statement->fetch();

            if(count($row) > 0) {
                $tbl_ids = $row[$idname1];
            }

        } catch (PDOException $e) {
            return $e;
        }

        return $tbl_ids;
    }

    function delId($dbconn, $tbl, $idname, $val) {
        $respo = false;

        $query_str = "DELETE FROM `$tbl` where `$idname`=$val";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();
            $respo = true;

        } catch (PDOException $e) {
            return $e;
        }

        return $respo;
    }

    function auditLog($dbconn, $mdl_log) {
        $u = $mdl_log->userid;
        $w = $mdl_log->webpage;
        $t = $mdl_log->process;
        $r = $mdl_log->receiver;
        $e = $mdl_log->errlbl;

        $tblname = "tbl_logs";
        $query_str = "INSERT INTO `$tblname` (`log_postuid`,`log_webpage`,`log_transaction`,`log_seen`,`log_getuid`) ";
        $query_str .= "VALUES ($u,'$w','$t',0,$r);";
        try {
            $statement = $dbconn->prepare($query_str);
            $statement->execute();

            if ($t == "logout") {
                session_unset();
                session_destroy();

                $ls_uid = "window.localStorage.setItem('uid', '');";
                $ls_fname = "window.localStorage.setItem('fname', '');";
                $ls_role = "window.localStorage.setItem('role', '');";
                $ls_clear = "window.localStorage.clear();";
                $ss_clear = "window.sessionStorage.clear();";
                $relocate = "window.location.href = '../../../../index.html'; ";
                echo "<script>$ls_uid $ls_fname $ls_role $ls_clear $ss_clear $relocate</script>";
            
                // header("Location: ../../../../index.html");
                die();
            }

        } catch (PDOException $err) { echo getResponse(false, "$e : $err", -1); return; }

    }