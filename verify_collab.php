<?php
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$username = "root";
$password = "";
$database = "editor";
$conn = mysqli_connect($host, $username, $password, $database);

$shareToken = $_GET['token'] ?? die(json_encode(["success" => false, "message" => "No token provided"]));

// Simple query to verify share token
$query = "SELECT * FROM collaboration_master WHERE share_token = '$shareToken'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    $collaboration = mysqli_fetch_assoc($result);

    echo json_encode([
        "success" => true,
        "projectId" => $collaboration['project_id'],
        "permission" => $collaboration['permission_type']
    ]);
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Invalid collaboration link"
    ]);
}


?>