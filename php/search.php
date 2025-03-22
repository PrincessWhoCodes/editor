<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json'); // Ensure JSON response
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$username = "root";
$password = "";
$database = "editor";
$conn = mysqli_connect($host, $username, $password, $database);

// Check if the connection was successful
// $uid1=$_POST['userid'];
$sql = "SELECT userid, username FROM user_master ";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    // Fetch all users
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode(['users' => $users]);
} else {
    echo json_encode(['error' => 'No users found.']);
}
?>
