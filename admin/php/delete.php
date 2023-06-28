<?php

require_once 'databases.php';

if ($_POST['delete-operate'] == 'Delete') {
    $id = $_POST['id'];

    $query = "DELETE FROM products WHERE id = $id";
    $result = $conn->query($query);

    echo "$query<br>";
    echo "Row Deleted Successfully<br>";

    // Set cookie to expires
    // setcookie('product_details', '', time() - 100, '/');

}