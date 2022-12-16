<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $lawyerid = $_GET["lawyerid"];

    $query = "select * from tbl_rating ";
    $query .= "inner join tbl_user on tbl_rating.rating_userid=tbl_user.user_id ";
    $query .= "where tbl_rating.rating_lawyerid='$lawyerid' ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no ratings for this lawyer yet!", "Lawyer Rating Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();
        echo getResponse(json_encode($results), "Successfully retrieved Lawyer Rating!", "Lawyer Rating Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawyers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>