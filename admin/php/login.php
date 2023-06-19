<?php
//establish connection
require_once "databases.php";
error_log("login.php: initialised");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM adminusers WHERE username = '$username' AND password = '$password'";

    $result = $conn->query($sql);

    if ($result === false) {
        // Error executing the query
        $response = array(
            "status" => "error",
            "message" => "Error executing the query: " . $conn->error,
        );
    } elseif ($result->num_rows > 0) {
        // Successful login
        $response = array(
            "status" => "success",
            "message" => "Login successful!",
        );
    } else {
        // Failed login
        $response = array(
            "status" => "error",
            "message" => "Invalid username or password",
        );
    }

    // Return the response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    error_log("login.php: " . json_encode($response));
}