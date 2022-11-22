<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $roleid = $_GET["role"];
    $msgtyp = "user";

    $query = "select * from tbl_user ";
    $query .= "inner join tbl_contact on tbl_user.user_contactid=tbl_contact.contact_id ";
    $query .= "inner join tbl_login on tbl_user.user_id=tbl_login.login_userid ";
    $query .= "inner join tbl_role on tbl_login.login_roleid=tbl_role.role_id ";
    if ($roleid == "3") {
        $query .= "where tbl_login.login_roleid='3' ";
        $msgtyp = "lawyer";
    }
    else {
        $query .= "where NOT tbl_login.login_roleid='1' ";
    }
    $query .= "order by tbl_login.login_lastupdate desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no registered $msgtyp(s)!", "Registered $msgtyp(s) Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();
        echo getResponse(json_encode($results), "Successfully retrieved list of Registered $msgtyp(s)!", "List of Registered Users Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! getdb$msgtyp", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>