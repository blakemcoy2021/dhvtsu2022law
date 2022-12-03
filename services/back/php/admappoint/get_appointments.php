<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $t1 = "tbl_appointment";
    $t2 = "tbl_lawyer";
    $t3 = "tbl_user";
    $query = "select * from $t1 ";
    $query .= "inner join $t2 on $t1.app_lawyerid=$t2.lawyer_id ";
    $query .= "inner join $t3 on $t2.lawyer_userid=$t3.user_id ";
    $query .= "order by $t1.app_datesched desc, $t1.app_timesched desc";
    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no appointments!", "Appointments Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        $data = array();
        for ($i = 0; $i < sizeof($results); $i++) {
            $lawyerphoto = $results[$i]["user_photo"];
            $lawyername = $results[$i]["user_lastname"] . ", " . $results[$i]["user_firstname"];
            $datetime = $results[$i]["app_datesched"] . " " . $results[$i]["app_timesched"];
            $status = $results[$i]["app_status"];
            $datesaved = $results[$i]["app_datesaved"];

            $affected_user = 0;
            $affected_user_photo = "n/a";
            $affected = $results[$i]["app_userid"];
            $isContinue = true;

            if ($affected != 0) {
                $query = "select * from tbl_user ";
                $query .= "where user_id='$affected' ";
                $stmt = $conn->prepare($query);
                $stmt->execute();
                $row = $stmt->fetch();

                if ($row) {
                    $affected_user = $row["user_lastname"] . ", " . $row["user_firstname"];
                    $affected_user_photo = $row["user_photo"];
                }
                else {
                    $isContinue = false;
                }
            }

            if ($isContinue == true) {
                $info = array(
                    "id"=>$results[$i]["app_id"],
                    "clientphoto"=>$affected_user_photo,
                    "clientname"=>$affected_user, 
                    "lawyerphoto"=>$lawyerphoto,
                    "lawyername"=>$lawyername, 
                    "datetime"=>$datetime, 
                    "status"=>$status, 
                    "datesaved"=>$datesaved);
    
                array_push($data, $info);
            }

        }


        echo getResponse(json_encode($data), "Successfully retrieved list of appointments!", "List of Appointments Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! getdbappoints", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>