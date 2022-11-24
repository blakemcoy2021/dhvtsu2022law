<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    
    $search = cleanSqlSave($_GET["search"]); // echo "$search <br>";

    $query = "select * from tbl_lawfield ";
    $query .= "inner join tbl_lawcategory on ";
    $query .= "tbl_lawfield.lawfield_categoryid=tbl_lawcategory.lawcategory_id ";
    $query .= "order by tbl_lawfield.lawfield_id desc";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            echo getResponse(false, "There are no match results found!", "Law Search Not Found.");
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        // echo "<pre>";
        // print_r($results);
        // echo "</pre>";
        // die();

        $search_keysArr = explode(" ", $search); // echo sizeof($search_keysArr) . "<br>";
        
        $search_results = array();
        for ($i = 0; $i < sizeof($search_keysArr); $i++) { // echo "<hr>";

            for ($j = 0; $j < sizeof($results); $j++) {
                $tags = $results[$j]["lawfield_tags"]; // echo "$tags <br>";
                $tagsArr = explode(", ", $tags);

                if (in_array($search_keysArr[$i], $tagsArr)) {
                    if (!in_array($results[$j], $search_results)) {
                        array_push($search_results, $results[$j]);
                    }

                }
            }
        }

        // echo "<pre>";
        // print_r($search_results);
        // echo "</pre>";
        // die();

        echo getResponse(json_encode($search_results), "Successfully retrieved list of search results!", "List of Law Search Found.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! srchdblaw", "Database Exception - " . $e->getMessage());

    }
    $conn = null;
