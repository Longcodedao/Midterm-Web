<?php

    session_start();

    require_once("../admin/php/databases.php");

    if ($_POST['user_data'] == 'Create'){
        $order_id = $_POST['order_id'];
        $product_id = $_POST['product_id'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $address = $_POST['address'];
        $city = $_POST['city'];
        $phone = $_POST['phone'];
        $values = get_product_value($conn, $product_id);

        $price = $values['price'];
        $ordername = $values['prod-name'];
        $orderimage = $values['prod-image'];
        // echo("$order_id<br>");
        // echo("$product_id<br>");
        // echo("$name<br>");
        // echo("$email<br>");
        // echo("$address<br>");
        // echo("$city<br>");
        // echo("$phone<br>");

        $customer_id = check_condtion($conn, $name, $email, $address, $city, $phone);
        if ($customer_id == ""){
            $customer_id = add_customer($conn, $name, $email, $address, $city, $phone);
        }
        echo($customer_id);
        
        add_order($conn, $order_id, $customer_id, $product_id, $price, 
                            $ordername, $orderimage);
        change_product_values($conn, $product_id);
    }   

    function add_customer($conn, $name, $email, $address, $city, $phone){
        $query = "INSERT INTO customers (Name, Address, City, Email, Phone)
                    VALUES('$name', '$address', '$city', '$email', '$phone')";
        echo("$query<br>");
        $result = $conn -> query($query);
        $new_query = "SELECT * FROM customers WHERE Name = '$name'";
        $new_result = $conn -> query($new_query);

        $row = $new_result -> fetch_assoc();
        return $row['ID'];
    }

    function check_condtion($conn, $name, $email, $address, $city, $phone){
        $query = "SELECT * FROM customers WHERE Name = '$name' 
                        OR Email = '$email' ";
            echo("$query<br>");
        $result = $conn -> query($query);

        if ($result -> num_rows > 0){
            $row = $result -> fetch_assoc();
            $cust_id = $row['ID'];
            $update_detail = "UPDATE customers SET Name = '$name', Email = '$email',
                                    Address = '$address', City = '$city', Phone = '$phone'";

            $update = $conn -> query($update_detail); 
            return $cust_id;
        } 
        return "";

    }

    function add_order($conn, $order_id, $customer_id, $product_id, 
                                    $order_value, $ordername, $orderimage){
        $currentDate = date('Y-m-d H:i:s');

        $query = "INSERT INTO orders (OrderID, ProductID, CustomerID, Date, 
                    OrderValue, OrderProductName, OrderProductImage)
                        VALUES ('$order_id', '$product_id', '$customer_id', 
                        '$currentDate', '$order_value', '$ordername', '$orderimage')";
        echo ($query);
        $result = $conn -> query($query);


    }
    function get_product_value($conn, $product_id){
        $query = "SELECT * from products WHERE id = $product_id";

        $update = $conn -> query($query);
        $row = $update -> fetch_assoc();

        $result = array(
            'price' => $row['price'],
            'prod-name' => $row['name'],
            'prod-image' => $row['image']
        );

        return $result;
    }

    function change_product_values($conn, $product_id){
        $query = "UPDATE products SET purchasetime = purchasetime + 1 
                    WHERE id = $product_id";

        $update = $conn -> query($query);
    }
?>
