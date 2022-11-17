<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $uid = $_GET["uid"];

    $t1 = "tbl_appointment";
    $query = "select * from $t1 ";
    $query .= "inner join tbl_user on $t1.app_userid=tbl_user.user_id ";
    $query .= "where $t1.app_userid='$uid' ";
    $query .= "order by $t1.app_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no appointments!", "Appointments of User #$uid Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();
        echo getResponse(json_encode($results), "Successfully retrieved list of appointments!", "List of Appointments Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! getdbappoints", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>