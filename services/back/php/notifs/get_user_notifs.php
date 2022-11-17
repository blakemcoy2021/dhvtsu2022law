<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $uid = $_GET["uid"];

    $t1 = "tbl_logs";
    $t2 = "tbl_user";
    $t3 = "tbl_login";
    $query = "select $t1.log_id, $t1.log_datesaved, $t1.log_transaction, $t2.user_photo, $t3.login_verified from $t1 ";
    $query .= "inner join $t2 on $t1.log_getuid=$t2.user_id ";
    $query .= "inner join $t3 on $t1.log_getuid=$t3.login_userid ";
    $query .= "where $t1.log_getuid='$uid' ";
    $query .= "order by $t1.log_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no notifications!", "Notifications of User #$uid Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();
        echo getResponse(json_encode($results), "Successfully retrieved list of notifications!", "List of Notifications Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! getdbnotifs", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>