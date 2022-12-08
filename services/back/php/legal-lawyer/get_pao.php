<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $query = "select * from tbl_lawcategory ";
    $query .= "where lower(lawcategory_name) like '%pao%' ";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There is no PAO in law category", "PAO Law Category Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();

        echo getResponse(json_encode($results), "Successfully retrieved law category PAO!", "Law Category PAO Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawpao", "Database Exception - " . $e->getMessage());

    }
    $conn = null;
