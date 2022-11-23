<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $fid = $_GET["fid"];

    $query = "select * from tbl_lawfield ";
    $query .= "where lawfield_id=$fid ";
    $query .= "order by lawfield_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no Law field #$fid!", "Law field #$fid Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        echo getResponse(json_encode($results), "Successfully retrieved Law field #$fid!", "Law field #$fid Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawfld", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>