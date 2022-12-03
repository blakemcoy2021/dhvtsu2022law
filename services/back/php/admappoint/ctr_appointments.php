<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";


    $query = "select count(*) as ctr from tbl_appointment ";
    $query .= "order by app_datesched desc, app_timesched desc";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        
        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "Unable to count appointment(s)!", "Query Result Error.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        $ctr = $results["ctr"];

        echo getResponse($ctr, "Successfully retrieved number of appointment(s)!", "Number of appointment(s) counted as $ctr.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dbctrapp", "Database Exception - " . $e->getMessage());
    }
    $conn = null;

?>