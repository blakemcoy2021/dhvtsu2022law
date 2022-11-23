<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $query = "select count(*) as ctr from tbl_lawfield ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        
        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "Unable to law fields!", "Query Result Error.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        $ctr = $results["ctr"];

        echo getResponse($ctr, "Successfully retrieved law fields!", "Number of law fields counted as $ctr.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dbctrlawfld", "Database Exception - " . $e->getMessage());
    }
    $conn = null;

?>