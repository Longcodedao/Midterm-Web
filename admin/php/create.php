<?php

    require_once('databases.php');
    include("function.php");

    if ($_POST['operation'] == 'Create'){
        // $image = '';
        // if ($_FILES['image']['name'] != '') {
        //     $image = submit_image();
        // }
        $name = $_POST['name'];
        $description = $_POST['description'];
        $detail = $_POST['details'];
        $price = $_POST['price'];
        $image = $_POST['image'];

        echo("$name<br>");
        echo("$description<br>");
        echo("$detail<br>");
        echo("$price<br>");
        echo("$image<br>");

        $query = "INSERT INTO products (name, description, details, price, image) VALUES('$name', '$description', '$detail', '$price', '$image')";
        echo("$query<br>");
        $result = $conn -> query($query);
    }
?>