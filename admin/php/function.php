<?php

    require_once "databases.php";

    function submit_image(){
        if (isset($_FILES["image"])){
            $targetDir = "../../images/upload/";

            $image = $_FILES["image"];
            $imagePath = $targetDir . basename($image["name"]);
            error_log("The path is: $imagePath <br>");

            $imageFileType = strtolower(pathinfo($imagePath, PATHINFO_EXTENSION));
            $allowedExtensions = array("jpg", "jpeg", "png", "gif");

            if (in_array($imageFileType, $allowedExtensions)) {
                if (move_uploaded_file($image["tmp_name"], $imagePath)) {
                    error_log("Image uploaded successfully <br>");
                    return $imagePath;
                }else{
                    error_log("Error moving the uploaded image <br>");
                }
            }else{
                error_log("Invalid file format. Only JPG, JPEG, PNG, and GIF files are allowed. <br>");
            }

            return '';
        }   

    }

    // function get_filter_users
?>