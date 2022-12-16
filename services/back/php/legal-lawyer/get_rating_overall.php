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
        $rows = $stmt->fetchAll();  
        $totalrow = count($rows);
        if ($totalrow < 1) {
            echo getResponse(false, "There are no ratings for this lawyer yet!", "Lawyer Rating Not Found.");
            $conn = null;
            die();
        }

        $query = "select sum(rating_value) as total from tbl_rating ";
        $query .= "inner join tbl_user on tbl_rating.rating_userid=tbl_user.user_id ";
        $query .= "where tbl_rating.rating_lawyerid='$lawyerid' ";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch();
        $total = $row["total"];

        $overall = $totalrow * 5;
        $overall = $total / $overall;

        echo getResponse($overall, "Successfully retrieved Overall Lawyer Rating!", "Overall Lawyer Rating Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawyers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>