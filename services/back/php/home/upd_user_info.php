<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $fname = $_POST["fname"];
    $mname = $_POST["mname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $addr = $_POST["addr"];
    $bday = $_POST["bday"];
    $islaw = $_POST["islaw"];

    $role = 2;
    if ($islaw == "true") {
        $role = 3;
    }
    $uid = $_POST["uid"];

    // echo "$fname, $mname, $lname, $email, $phone, $addr, $bday, $islaw, $role, $uid"; die();

    $update_str = "tbl_user.user_firstname='$fname',";
    $update_str .= "tbl_user.user_midname='$mname',";
    $update_str .= "tbl_user.user_lastname='$lname',";
    $update_str .= "tbl_contact.contact_email='$email',";
    $update_str .= "tbl_contact.contact_phone='$phone',";
    $update_str .= "tbl_contact.contact_address='$addr',";
    $update_str .= "tbl_user.user_birthdate='$bday',";
    $update_str .= "tbl_login.login_roleid='$role'";
    $query = "update tbl_user ";
    $query .= "inner join tbl_contact on tbl_user.user_contactid=tbl_contact.contact_id ";
    $query .= "inner join tbl_login on tbl_user.user_id=tbl_login.login_userid ";
    $query .= "set $update_str ";
    $query .= "where tbl_user.user_id='$uid' ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        echo getResponse(true, "Successfully update User #$uid!", "User #$uid Updated.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! upddbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>