<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $uid = $_GET["uid"];
    $vfy = $_GET["vfy"];

    $query = "update tbl_login set login_verified='$vfy' where login_userid='$uid' ";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        $msg = "Verified";
        if ($vfy == -1) {
            $msg = "Declined";
        }
        echo getResponse(true, "Successfully $msg User #$uid!", "User #$uid $msg.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! vdbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>