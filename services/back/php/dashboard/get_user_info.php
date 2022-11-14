<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $uid = $_GET["uid"];

    $query = "select * from tbl_user ";
    $query .= "inner join tbl_contact on tbl_user.user_contactid=tbl_contact.contact_id ";
    $query .= "inner join tbl_login on tbl_user.user_id=tbl_login.login_userid ";
    $query .= "inner join tbl_role on tbl_login.login_roleid=tbl_role.role_id ";
    $query .= "inner join tbl_lawyer on tbl_user.user_id=tbl_lawyer.lawyer_userid ";
    $query .= "where tbl_user.user_id=$uid ";
    $query .= "order by user_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no user #$uid!", "User #$uid Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        echo getResponse(json_encode($results), "Successfully retrieved User #$uid!", "User #$uid Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>