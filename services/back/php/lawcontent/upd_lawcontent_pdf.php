<?php

    include "../common/dbconfig.php";
    include "../common/utilities.php";
    include "../common/model_logs.php";

    $errors = [];
    $data = array();

    $pdf = $_FILES["pdf"];
    $cnid = $_POST["cnid"];
    $uid = $_POST["uid"];

    $fldrname = "zlawfirm";
    //** validate pdf size */
                                
        // pre-file path
        $info = pathinfo($pdf["name"]);
        $ext = $info['extension'];

        $s = ucfirst("lawcontentid$cnid");
        $bar = ucwords(strtolower($s));
        $trim_name = preg_replace('/\s+/','',$bar);
        
        $loc_pdf = "data/lawcn/pdf/$trim_name";
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
    
        //** post-file path; path pdf */
        $upload_urlph = $p . $loc_pdf;
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
    
        if ($pdf != "none") {
            //** validate pdf size */
            
            if ($pdf["size"] > 20000000) {
                echo getResponse(false, "File is too large! Less than 20MB is required.", "Uploading PDF is more than 20MB.");
                die();
            }

            //** upload pdf */
            try {
                move_uploaded_file($pdf["tmp_name"], $fph);
            } catch (Exception $err) {
                echo getResponse(false, "Server Pdf Save Error!", "Pdf Save Error :: $err.");
                die();
            }        
        }
        
        $dbpath_ph = $loc_pdf . '/' . $fileph;



    $update_str = "set law_attachfile='$dbpath_ph'";

    $query = "update tbl_lawcontent ";
    $query .= "$update_str ";
    $query .= "where law_id='$cnid' ";

    try {
        $conn = getConnection();
        $stmt = $conn->prepare($query);
        $stmt->execute();

        $msg = "Law Content File";
        $msgtyp = "pdflawcontent";
        echo getResponse(true, "Successfully Uploaded $msg of Law Content #$cnid!", "Law Content #$cnid Uploaded $msg.");

        $mdl = new ModelLogs();
        $mdl->userid = $uid;
        $mdl->webpage = "lawcontent";
        $mdl->process = "update $msgtyp";
        $mdl->receiver = 0;
        $mdl->errlbl .= "admin-audit";
        auditLog($conn, $mdl);

    } catch(PDOException $e) {
        echo getResponse(false, "Server Error! upddblawcnpdf", "Database Exception - " . $e->getMessage());

    }
    $conn = null;

?>