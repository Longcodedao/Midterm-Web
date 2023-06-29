<?php
    session_start();

    unset($_SESSION['product_id']);
    unset($_SESSION['order_id']);

    // Clear all session variables
    session_unset();

    // Destroy the session
    session_destroy();

    echo "Delete Session";
?>
