<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $uid = $_GET["uid"];

    $query = "insert into tbl_toslogs (`toslog_uid`) values ('$uid');";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        $stmt->execute();

        echo getResponse("success", "Successfully Agreed ToS! You may now proceed updating/uploading your information.", "ToS Accepted.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! lawToS", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>