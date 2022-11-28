<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $catid = $_GET["catid"];

    $query = "select * from tbl_lawcontent ";
    $query .= "where law_lawcategoryid='$catid' ";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no law content found in category#$catid!", "Content Category#$catid Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        echo getResponse(json_encode($results), "Successfully retrieved Law category #$catid!", "Law Category #$catid Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawcat", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>