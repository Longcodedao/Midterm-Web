<?php

require_once "databases.php";
error_log("listorder.php :: initialized");

$query = "SELECT o.OrderID, o.Date, p.name, p.price, c.Name, c.Phone, c.Email, c.Address, c.City
          FROM orders AS o
          INNER JOIN products AS p ON o.ProductID = p.id
          INNER JOIN customers AS c ON o.CustomerID = c.ID";

$result = $conn->query($query);

if ($result) {
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $orderID = $row['OrderID'];
        $orderDetailLink = "<button class='btn btn-warning detail-btn' onclick=\"window.location.href='admin-order-detail.php?orderID=$orderID'\"><i class=\"fa-solid fa-circle-info\"></i></button>";
        $row['ViewDetails'] = $orderDetailLink;
        $data[] = $row;
        error_log("listorder.php :: Data added: " . json_encode($row));

    }

    error_log(json_encode($data));
    echo json_encode(array("data" => $data));
} else {
    echo json_encode(array("error" => "Failed to retrieve data from the database."));
}

$conn->close();