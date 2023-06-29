<?php
    require("../admin/php/databases.php");

    if (isset($_POST['order_id'])){
        $orderID = $_POST['order_id'];
        // echo("$orderID <br>");
        $sql = "SELECT * 
                    FROM orders 
                    JOIN customers ON orders.CustomerID = customers.ID
                    WHERE orders.OrderID = '$orderID'";
        // die("$sql<br>");
        $result = $conn -> query($sql);
        if ($result === false){
            die("Query failed ". $conn -> error);
        }
        
        if ($result -> num_rows > 0){
            $row = $result -> fetch_assoc();
            $orderJson = json_encode($row);
            echo $orderJson;
        }else {
            die ("No results are founded");
        }
    } else {
        die ("No orderID has been founded");
    }
?>