<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";


    $uid = $_GET["uid"];

    
    try {
        $conn = getConnection();
        $lawyerid = getId($conn, "tbl_lawyer", "lawyer_id", "", "", $uid, "lawyer_userid");

        $t1 = "tbl_appointment";
        $t2 = "tbl_user";
        $t3 = "tbl_contact";
        $query = "select * from $t1 ";
        $query .= "inner join $t2 on $t1.app_userid=$t2.user_id ";
        $query .= "inner join $t3 on $t2.user_contactid=$t3.contact_id ";
        $query .= "where $t1.app_lawyerid='$lawyerid' ";
        $query .= "order by $t1.app_datesched desc, $t1.app_timesched desc";


        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no appointments!", "Appointments of Lawyer #$lawyerid Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();
        echo getResponse(json_encode($results), "Successfully retrieved list of appointments!", "List of Appointments Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! getdbappoints", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>