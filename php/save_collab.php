<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$username = "root";
$password = "";
$database = "editor";
$conn = mysqli_connect($host, $username, $password, $database);


    $projectId = $_POST['projectId']; // Project ID
    $uid1 = $_POST['uid1'];  // Giver user ID
    $uid2 = $_POST['uid2'];  // Receiver user ID
    $permission_type = $_POST['permission_type']; 
    // $shareToken = bin2hex(random_bytes(16)); // 0 for read-only, 1 for read-write

    // First, check if the project exists in the project_master table
    $projectQuery = "SELECT project_id FROM project_master WHERE project_id = '$projectId'";
    $projectResult = mysqli_query($conn, $projectQuery);

    if (mysqli_num_rows($projectResult) > 0) {
        // Fetch the project_id (in case you want to use it later)
        $projectData = mysqli_fetch_assoc($projectResult);
        $projectId = $projectData['project_id']; // Store project_id in a variable

        // If the project exists, insert the collaboration record into the database
        $query = "INSERT INTO collaboration_master (project_id, uid1, uid2, permission_type) 
                  VALUES ('$projectId', '$uid1', '$uid2', '$permission_type')";

        if (mysqli_query($conn, $query)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to save collaboration.']);
        }
    } else {
        // If project doesn't exist
        echo json_encode(['success' => false, 'message' => 'Project does not exist.']);
    }

?>
