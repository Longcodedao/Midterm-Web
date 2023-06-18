<?php

$servername = "fdb1030.awardspace.net";
$username = "4332767_witterwither";
$database = "4332767_witterwither";
$password = "Dinhchinh123@";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    error_log("databases.php: connection failed: " . $conn->connect_error); // print then exit the script

    // echo ("<br> connection failed: " . $conn->connect_error); // print then exit the
} else {
    // echo ("connected successfully");
    error_log("databases.php: connected successfully");

}