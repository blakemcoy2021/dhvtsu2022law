<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    
    $lfid = $_GET["lfid"]; // echo "$search <br>";

    $query = "select * from tbl_lawfield ";
    $query .= "inner join tbl_lawcategory on ";
    $query .= "tbl_lawfield.lawfield_categoryid=tbl_lawcategory.lawcategory_id ";
    $query .= "inner join tbl_lawyer on ";
    $query .= "tbl_lawfield.lawfield_categoryid=tbl_lawyer.lawyer_lawcatid ";
    $query .= "inner join tbl_user on ";
    $query .= "tbl_lawyer.lawyer_userid=tbl_user.user_id ";
    $query .= "inner join tbl_login on ";
    $query .= "tbl_user.user_id=tbl_login.login_userid ";
    $query .= "inner join tbl_days on ";
    $query .= "tbl_lawyer.lawyer_daysid=tbl_days.days_id ";
    $query .= "where tbl_login.login_verified='1' ";
    if ($lfid != -1) {
        $query .= "and tbl_lawfield.lawfield_id='$lfid' ";
    }
    $query .= "order by tbl_lawfield.lawfield_id desc";     //echo $query; die();

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There is no law field found @ ref#$lfid!", "Law Field/Category Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        // echo "<pre>";
        // print_r($results);
        // echo "</pre>";
        // die();

        echo getResponse(json_encode($results), "Successfully retrieved law field/category #$lfid!", "Law Field/Category #$lfid Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawfldcat", "Database Exception - " . $e->getMessage());

    }
    $conn = null;
