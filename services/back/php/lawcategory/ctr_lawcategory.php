<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $query = "select count(*) as ctr from tbl_lawcategory ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        
        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "Unable to law categories!", "Query Result Error.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        $ctr = $results["ctr"];

        echo getResponse($ctr, "Successfully retrieved law categories!", "Number of law categories counted as $ctr.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dbctrlawcat", "Database Exception - " . $e->getMessage());
    }
    $conn = null;

?>