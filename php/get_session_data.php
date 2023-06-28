<?php
    session_start();

    if (isset($_SESSION['product_id'])){
        $productId = $_SESSION['product_id'];
        echo $productId;
    }else {
        echo "Session value not found";
    }
?>