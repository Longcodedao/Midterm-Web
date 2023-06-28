<?php
    require_once("databases.php");

    if ($_POST['operation'] == "Edit") {
        $id  = $_POST['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $price = $_POST['price'];
        $image = $_POST['image'];


        $query = "UPDATE products SET name = '$name', 
                    description = '$description',
                    price = '$price',
                    image = '$image' WHERE id = '$id'";
        // echo("$query<br>");
        $result = $conn -> query($query);

        // Set cookie to expires
        // setcookie('product_details', '', time() - 100, '/');

        if ($result) {
            $array_encode = array(
                'id' => $id,
            );
            echo json_encode($array_encode);
        } else{
            $response = array(
                'error' => 'Database update failed'
            );
            echo json_encode($response);
        }
        
        $conn -> close();
        // header("Location: ../product-detail-admin.html?id={$id}");
        // exit;
    }
?>