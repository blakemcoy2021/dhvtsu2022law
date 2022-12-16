<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $catid = $_GET["catid"];

    $query = "select * from tbl_lawfield ";
    $query .= "where lawfield_categoryid='$catid' ";
    $query .= "order by lawfield_id desc ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no match results found!", "Sub Laws Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        echo getResponse(json_encode($results), "Successfully retrieved list of laws!", "List of Laws Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! srchdblaw", "Database Exception - " . $e->getMessage());

    }
    $conn = null;
