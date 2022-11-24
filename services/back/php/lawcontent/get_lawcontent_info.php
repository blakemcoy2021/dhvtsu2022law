<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $cnid = $_GET["cnid"];

    $query = "select * from tbl_lawcontent ";
    $query .= "inner join tbl_lawcategory on tbl_lawcontent.law_lawcategoryid=tbl_lawcategory.lawcategory_id ";
    $query .= "where tbl_lawcontent.law_id=$cnid ";
    $query .= "order by tbl_lawcontent.law_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no Law contents #$cnid!", "Law contents #$cnid Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        echo getResponse(json_encode($results), "Successfully retrieved Law contents #$cnid!", "Law contents #$cnid Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! dblawcn", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>