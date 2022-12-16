<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $appId = $_GET["appid"];

    $query = "select * from tbl_rating ";
    $query .= "inner join tbl_appointment on tbl_rating.rating_id=tbl_appointment.app_ratingid ";
    $query .= "where tbl_appointment.app_id='$appId' ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch();
        $ratingval = $row["rating_value"];
        $ratingcomment = $row["rating_comment"];

        if ($ratingval == 0 && $ratingcomment == "n/a") {
            echo getResponse(true, "Can be rated still", "Rating In-progress.");
        }
        else {
            echo getResponse(false, "You had already rate this appointment on Lawyer!", "Rating Done Already.");
        }

    } catch (PDOException $e) {
        echo getResponse(false, "Server Error! rvdbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>