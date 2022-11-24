<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    
    $lfid = $_GET["lfid"]; // echo "$search <br>";

    $query = "select * from tbl_lawfield ";
    $query .= "inner join tbl_lawcategory on ";
    $query .= "tbl_lawfield.lawfield_categoryid=tbl_lawcategory.lawcategory_id ";
    $query .= "where tbl_lawfield.lawfield_id='$lfid' ";
    $query .= "order by tbl_lawfield.lawfield_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There is no law field found @ ref#$lfid!", "Law Field/Category Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();

        echo getResponse(json_encode($results), "Successfully retrieved law field/category #$lfid!", "Law Field/Category #$lfid Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawfldcat", "Database Exception - " . $e->getMessage());

    }
    $conn = null;
