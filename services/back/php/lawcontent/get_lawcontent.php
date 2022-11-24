<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $query = "select * from tbl_lawcontent ";
    $query .= "inner join tbl_lawcategory on tbl_lawcontent.law_lawcategoryid=tbl_lawcategory.lawcategory_id ";
    $query .= "order by tbl_lawcontent.law_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no law contents!", "Law Contents Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        echo getResponse(json_encode($results), "Successfully retrieved list of law contents!", "List of Law Contents Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! getdblawcontent", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>