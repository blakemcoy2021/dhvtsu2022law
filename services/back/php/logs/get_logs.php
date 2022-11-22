<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $query = "select * from tbl_logs ";
    $query .= "inner join tbl_user on tbl_logs.log_postuid=tbl_user.user_id ";
    $query .= "inner join tbl_login on tbl_user.user_id=tbl_login.login_userid ";
    $query .= "order by tbl_logs.log_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no log(s)!", "Log(s) Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        // echo "<pre>";
        // print_r($results);
        // echo "</pre>";
        // die();

        $data = array();
        for ($i = 0; $i < sizeof($results); $i++) {
            $usertype = "Admin";
            $roleid = $results[$i]["login_roleid"];
            if ($roleid == 3) {
                $usertype = "Lawyer";
            }
            else if ($roleid == 2) {
                $usertype = "Cient";
            }
            $fullname = $results[$i]["user_lastname"] . ", " . $results[$i]["user_firstname"] . ": " . $results[$i]["user_id"];
            $webpage = ucfirst($results[$i]["log_webpage"]);
            $transaction = $results[$i]["log_transaction"];
            $datesaved = $results[$i]["log_datesaved"];

            $affected_user = "n/a";
            $affected = $results[$i]["log_getuid"];
            if ($affected != 0) {
                $query = "select * from tbl_user ";
                $query .= "where user_id='$affected' ";
                $stmt = $conn->prepare($query);
                $stmt->execute();
                $row = $stmt->fetch();

                $affected_user = $row["user_lastname"] . ", " . $row["user_firstname"] . ": $affected";
            }

            $info = array(
                "id"=>$results[$i]["log_id"],
                "usertype"=>$usertype, 
                "fullname"=>$fullname, 
                "webpage"=>$webpage, 
                "transaction"=>$transaction, 
                "datesaved"=>$datesaved,
                "affected"=>$affected_user);

            array_push($data, $info);
        }

        // echo "<pre>";
        // print_r($data);
        // echo "</pre>";
        // die();

        echo getResponse(json_encode($data), "Successfully retrieved list of log(s)!", "List of Logs Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! getdblogs", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>