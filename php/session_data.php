<?php
    session_start();

    $_SESSION['product_id'] = $_POST['id'];
    // echo "Product ID: {$_SESSION['product_id']}";
?>