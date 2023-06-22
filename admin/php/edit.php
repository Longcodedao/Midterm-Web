<?php
    require_once("databases.php");

    if ($_POST['operation'] == "Edit") {
        $id  = $_POST['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $price = $_POST['price'];
        $image = $_POST['image'];

        echo("$id<br>");
        echo("$name<br>");
        echo("$description<br>");
        echo("$price<br>");
        echo("$image<br>");

        $query = "UPDATE products SET name = '$name', 
                    description = '$description',
                    price = '$price',
                    image = '$image' WHERE id = '$id'";
        echo("$query<br>");
        $result = $conn -> query($query);

        // Set cookie to expires
        setcookie('product_details', '', time() - 100, '/');

        
    }
?>