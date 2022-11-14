<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";

    $errors = [];
    $data = array();

    $photo = $_FILES["photo"];
    $type = $_POST["type"];
    $uid = $_POST["uid"]; // echo "$type $uid"; die();

    $fldrname = "zlawfirm";
    //** validate photo if photo and size */
                                
        // pre-file path
        $info = pathinfo($photo["name"]);
        $ext = $info['extension'];

        $s = ucfirst("userid$uid");
        $bar = ucwords(strtolower($s));
        $trim_name = preg_replace('/\s+/','',$bar);
        
        $loc_photo = "data/users/imgs/$trim_name";
        if ($type == "1") {
            $loc_photo = "data/users/validids/$trim_name";
        }
        else if ($type == "2") {
            $loc_photo = "data/users/prcids/$trim_name";
        }
        $fileph = "$trim_name.$ext";
        

        //** getting parent path */
        $parent_path = explode("/",__DIR__);
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $parent_path = explode("\\",__DIR__);
        }
        $p = "/";
        $indexpath_max = 3;
        if ($i = array_search($fldrname, $parent_path)) {
            $indexpath_max = $i;					
            for ($i = 1; $i <= $indexpath_max; $i++) {
                $p .= $parent_path[$i] . "/";
            }
        } 
        else {
            $p = "/".$parent_path[1].
            "/".$parent_path[2].
            "/".$parent_path[3]."/";
        }
    
        //** post-file path; path photo */
        $upload_urlph = $p . $loc_photo;
        $fph = $upload_urlph . "/" . $fileph;
    
        //** parent directory */
        $createDirectory = true;
        if (is_writable($p)) {
            if (file_exists($upload_urlph)) {
                $createDirectory = false;
            }
            if (!is_dir($upload_urlph)) {
                $createDirectory = true;
            }
        } 
        else {
            echo getResponse(false, "Server Path Error!", "Path not writable.");
            die();
        }
        if ($createDirectory) {
            mkdir($upload_urlph, 0777, true);
        }
    
        if ($photo != "none") {
            //** validate photo if photo and size */
            $photomime;
            $checkphoto = getimagesize($photo["tmp_name"]);
            if ($checkphoto === false) {
                echo getResponse(false, 
                    "Selected Image File is corrupted. Find less than 4MB image jpg/png also.!", "Not valid photo.");
                die();
            } 
            else {
                $photomime = $checkphoto["mime"];
            }
            if ($photo["size"] > 4000000) {
                echo getResponse(false, "File is to large! Less than 4MB is required.", "Uploading Photo is more than 4MB.");
                die();
            }

            //** upload photo */
            try {
                move_uploaded_file($photo["tmp_name"], $fph);
            } catch (Exception $err) {
                echo getResponse(false, "Server Photo Save Error!", "Photo Save Error :: $err.");
                die();
            }        
        }
        
        $dbpath_ph = $loc_photo . '/' . $fileph;



    $update_str = "set tbl_user.user_photo='$dbpath_ph' ";
    if ($type == "1") {
        $update_str = "set tbl_user.user_validid='$dbpath_ph' ";
    }
    else if ($type == "2") {
        $update_str = "inner join tbl_lawyer on tbl_user.user_id=tbl_lawyer.lawyer_userid ";
        $update_str .= "set tbl_lawyer.lawyer_prcid='$dbpath_ph' ";
    }

    $query = "update tbl_user ";
    $query .= "$update_str ";
    $query .= "where tbl_user.user_id='$uid' ";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        $msg = "User Photo";
        if ($type == "1") {
            $msg = "Valid Id";
        }
        else if ($type == "2") {
            $msg = "PRC Id";
        }
        echo getResponse(true, "Successfully Uploaded $msg of User #$uid!", "User #$uid Uploaded $msg.");

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! upddbusers", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>