<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $uid = $_GET["uid"];

    $query = "select * from tbl_logs ";
    $query .= "where log_getuid='$uid' ";
    $query .= "order by log_id desc";

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