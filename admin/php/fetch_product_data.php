<?php

    require_once("databases.php");

    if (isset($_GET["id"])){
        $productId = $_GET['id'];

        $query = "SELECT * FROM products WHERE id = $productId";
        $result = $conn -> query($query);

        $product = $result -> fetch_assoc();
        if ($product) {
            header('Content-Type: application/json');
            $productJson = json_encode($product);
            echo $productJson;

            // Cookie expires in 30 seconds
            // setcookie('product_details', $productJson, time() + 30, '/');
        }else{
            header('Content-Type: application/json');
            echo json_encode(array('error' => 'Product not found.'));
        }
    }else {
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'Invalid product ID.'));;
    }
?>