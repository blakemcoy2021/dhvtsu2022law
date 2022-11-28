<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $lawyerid = $_GET["lawyerid"];

    $t1 = "tbl_lawyer";
    $t2 = "tbl_user";
    $t3 = "tbl_lawcategory";
    $t4 = "tbl_days";
    $t5 = "tbl_contact";
    $t6 = "tbl_lawcontent";
    $query = "select * from $t1 ";
    $query .= "inner join $t2 on $t1.lawyer_userid=$t2.user_id ";
    $query .= "inner join $t3 on $t1.lawyer_lawcatid=$t3.lawcategory_id ";
    $query .= "inner join $t4 on $t1.lawyer_daysid=$t4.days_id ";
    $query .= "inner join $t5 on $t2.user_contactid=$t5.contact_id ";
    $query .= "where $t1.lawyer_id=$lawyerid ";
    $query .= "order by $t1.lawyer_id desc";


    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no lawyer #$lawyerid!", "Lawyer #$lawyerid Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        echo getResponse(json_encode($results), "Successfully retrieved Lawyer #$lawyerid!", "Lawyer #$lawyerid Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawyers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>