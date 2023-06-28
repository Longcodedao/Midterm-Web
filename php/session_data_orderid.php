<?php
    session_start();

    $_SESSION['order_id'] = $_POST['order_id'];

    echo "Order ID: {$_SESSION['order_id']}";

?>