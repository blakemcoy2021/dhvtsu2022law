<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $uid = $_GET["uid"];

    $t1 = "tbl_appointment";
    $t2 = "tbl_lawyer";
    $t3 = "tbl_user";
    $t4 = "tbl_contact";
    $t5 = "tbl_lawcategory";
    $query = "select * from $t1 ";
    $query .= "inner join $t2 on $t1.app_lawyerid=$t2.lawyer_id ";
    $query .= "inner join $t3 on $t2.lawyer_userid=$t3.user_id ";
    $query .= "inner join $t4 on $t3.user_contactid=$t4.contact_id ";
    $query .= "inner join $t5 on $t2.lawyer_lawcatid=$t5.lawcategory_id ";
    $query .= "where $t1.app_userid='$uid' ";
    $query .= "order by $t1.app_datesched desc, $t1.app_timesched desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no appointments!", "Appointments of User #$uid Not Found.");
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