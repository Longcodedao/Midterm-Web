<?php
    require_once "databases.php";
    error_log("listprod.php :: initialized");

    $products = array();
    $query = "SELECT * FROM products ";


    if (isset($_POST["search"]["value"])){
        $query .= 'WHERE name LIKE "%' . $_POST["search"]["value"] . '"% ';
        $query .= 'OR description LIKE "%'. $_POST["search"]["value"] . '"% ';
        $query .= 'OR details LIKE "%' . $_POST["search"]["value"]. '"% ';
    }

    if (isset($_POST["order"])){
        $query .= 'ORDER BY ' . $_POST['order']['0']['column']. ' '. $_POST['order'][0]['dir']. ' ';
    }else{
        $query .= 'ORDER BY id ASC ';
    }

    $result = $conn -> query($query);
    $data = array();
    $filtered_rows = $result -> rowCount();

    while($row = $result -> fetch_assoc()){
        $image = '';
        if ($row["image"] != '') {
            $image = '<img src="../../images/upload/'. $row["image"] . '" class="img-thumbnail"
            width="50" height="50" />';

            error_log($row['image']. " <br>");
        }

        $sub_array = array();
        $sub_array[] = $row["id"];
        $sub_array[] = $row["name"];
        $sub_array[] = $row["description"];
        $sub_array[] = $row["details"];
        $sub_array[] = $row["price"];
        $sub_array[] = $image;
        $data[] = $sub_array;
    }
    $products = array(
        "draw"              => intval($_POST["draw"]),
        "recordsTotal"      => $filtered_rows,
        "data"              => $data
    );



    function submit_image(){
        if (isset($_FILES["image"])){
            $targetDir = "../../images/upload";

            $image = $_FILES["image"];
            $imagePath = $targetDir . basename($image["name"]);
            error_log("The path is: $imagePath <br>");

            $imageFileType = strtolower(pathinfo($imagePath, PATHINFO_EXTENSION));
            $allowedExtensions = array("jpg", "jpeg", "png", "gif");

            if (in_array($imageFileType, $allowedExtensions)) {
                if (move_uploaded_file($image["tmp_name"], $imagePath)) {
                    error_log("Image uploaded successfully <br>");
                }else{
                    error_log("Error moving the uploaded image <br>");
                }
            }else{
                error_log("Invalid file format. Only JPG, JPEG, PNG, and GIF files are allowed. <br>");
            }
        }   

    }

?>