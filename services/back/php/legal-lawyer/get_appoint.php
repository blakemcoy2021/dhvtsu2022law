<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];

    $lawyerId = $_GET["lawyerId"]; 
    
    $query = "select * from tbl_appointment ";
    $query .= "where app_lawyerid='$lawyerId' and not app_status='declined' and not app_status='done' and not app_status='cancel' ";
    $query .= "order by app_datesched desc, app_timesched desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        // $stmt->execute();
        // $rowctr = $stmt->fetchAll();  
        // if (count($rowctr) < 1) {
        //     echo getResponse(false, "There are no appointment(s) for Lawyer ref#$lawyerId!", "Appointments Not Found.");
        //     $conn = null;
        //     die();
        // }

        $stmt->execute();
        $results = $stmt->fetchAll();

        // echo "<pre>";
        // print_r($results);
        // echo "</pre>";
        // die();

        echo getResponse(json_encode($results), "Successfully retrieved appointments for Lawyer #$lawyerId!", "Appointment(s) for Lawyer #$lawyerId Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawapp", "Database Exception - " . $e->getMessage());

    }
    $conn = null;
