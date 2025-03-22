<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$username = "root";
$password = "";
$database = "editor";
$conn=mysqli_connect($host, $username, $password, $database);

$data = json_decode(file_get_contents("php://input"));


$project_id = $data->project_id; // Project ID
$uid1 = $data->uid1; // Giver user ID
$uid2 = $data->uid2; // Receiver user ID

// Validate the received data
if (empty($project_id) || empty($uid1) || empty($uid2)) {
    echo json_encode(['success' => false, 'message' => 'Required data missing: project_id, uid1, or uid2']);
    exit;
}

// Insert the collaboration data into the collaboration_master table
$sql = "INSERT INTO collaboration_master (project_id, uid1, uid2) 
        VALUES ('$project_id', '$uid1', '$uid2')";

if ($conn->query($sql) === TRUE) {
    // Get the last inserted collaboration_id (auto-generated)
    $cid = $conn->insert_id; // The auto-incremented ID from the last insert

    // Return the collaboration ID as the room ID
    echo json_encode(['success' => true, 'cid' => $cid]);
} else {
    // Failure: Return an error message
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}
?>
