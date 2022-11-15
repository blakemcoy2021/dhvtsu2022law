<?php

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
            
                header("Location: ../../../../index.html");
                die();
            }

        } catch (PDOException $err) { echo getResponse(false, "$e : $err", -1); return; }

    }