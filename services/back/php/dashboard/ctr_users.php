<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $roleid = $_GET["role"];
    $msgtyp = "user";

    $query = "select count(*) as ctr from tbl_user ";
    $query .= "inner join tbl_login on tbl_user.user_id=tbl_login.login_userid ";
    if ($roleid == "3") {
        $query .= "where tbl_login.login_roleid='3' ";
        $msgtyp = "lawyer";
    }
    else {
        $query .= "where NOT tbl_login.login_roleid='1' ";
    }
    $query .= "order by user_id desc";



    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        
        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "Unable to registered $msgtyp(s)!", "Query Result Error.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        $ctr = $results["ctr"];

        echo getResponse($ctr, "Successfully retrieved registered $msgtyp(s)!", "Number of $msgtyp(s) counted as $ctr.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dbctr$msgtyp", "Database Exception - " . $e->getMessage());
    }
    $conn = null;

?>