<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    
    $name = strtolower(cleanSqlSave($_GET["name"])); // echo "$search <br>";
    $catid = $_GET["catid"];

    $nameArr = [];
    if (strpos($name, " ")) {
        $nameArr = explode(" ",$name);
    }

    $query = "select * from tbl_lawcategory ";
    $query .= "inner join tbl_lawyer on ";
    $query .= "tbl_lawcategory.lawcategory_id=tbl_lawyer.lawyer_lawcatid ";
    $query .= "inner join tbl_user on ";
    $query .= "tbl_lawyer.lawyer_userid=tbl_user.user_id ";
    $query .= "inner join tbl_days on ";
    $query .= "tbl_lawyer.lawyer_daysid=tbl_days.days_id ";
    if (sizeof($nameArr) > 0) {
        $query .= "where ";
        if ($catid != 0) {
            $query .= "(";
        }
        for ($i = 0; $i < sizeof($nameArr); $i++) {
            $query .= "LOWER(tbl_user.user_firstname) like '%". $nameArr[$i] ."%' or LOWER(tbl_user.user_lastname) like '%". $nameArr[$i] ."%'";
            if ($i != (sizeof($nameArr)-1) ) {
                $query .= "or ";
            }
        }
    }
    else {
        $query .= "where ";
        if ($catid != 0) {
            $query .= "(";
        }
        $query .= "LOWER(tbl_user.user_firstname) like '%$name%' or LOWER(tbl_user.user_lastname) like '%$name%'";
    }
    if ($catid != 0) {
        $query .= ") and tbl_lawcategory.lawcategory_id='$catid' ";
    }
    $query .= " order by tbl_lawyer.lawyer_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There is/are no lawyer(s) found on given search values!", "Lawyers Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        // echo "<pre>";
        // print_r($results);
        // echo "</pre>";
        // die();

        echo getResponse(json_encode($results), "Successfully retrieved lawyers!", "Lawyers Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawlawyer", "Database Exception - " . $e->getMessage());

    }
    $conn = null;
