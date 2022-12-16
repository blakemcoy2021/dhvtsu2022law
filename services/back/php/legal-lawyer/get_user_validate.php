<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $luid = $_GET["luid"];

    $query = "select * from tbl_login ";
    $query .= "where login_userid='$luid' ";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no law content found in category#$luid!", "Content Category#$luid Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        echo getResponse(json_encode($results), "Successfully retrieved Law category #$luid!", "Law Category #$luid Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawcat", "Database Exception - " . $e->getMessage());
    }
    $conn = null;

?>