<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $query = "select * from tbl_lawcategory ";
    $query .= "order by lawcategory_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no lawyer categories yet!", "Lawyer Categories Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();
        echo getResponse(json_encode($results), "Successfully retrieved Lawyer Categories!", "Lawyer Categories Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! lawcatdbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>