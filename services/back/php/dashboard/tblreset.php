<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $query = "delete from tbl_waterval";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();

        $data['success'] = 'success';
        $data['message'] = "Successfully deleted all Water Consumptions!";
        $data['logs'] = "List of Water Consumptions Deleted.";
        echo json_encode($data);

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbwaterdelete ";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }
    $conn = null;

?>