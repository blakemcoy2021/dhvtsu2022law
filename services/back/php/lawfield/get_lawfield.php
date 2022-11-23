<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $query = "select * from tbl_lawfield ";
    $query .= "inner join tbl_lawcategory on tbl_lawfield.lawfield_categoryid=tbl_lawcategory.lawcategory_id ";
    $query .= "order by tbl_lawfield.lawfield_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no law fields!", "Law Fields Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        echo getResponse(json_encode($results), "Successfully retrieved list of law fields!", "List of Law Fields Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! getdblawfld", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>