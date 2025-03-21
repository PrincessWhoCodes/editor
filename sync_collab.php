<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$username = "root";
$password = "";
$database = "editor";
$conn = mysqli_connect($host, $username, $password, $database);

$data = json_decode(file_get_contents("php://input"), true);

$shareToken = $data['shareToken'] ?? die(json_encode(["success" => false, "message" => "No share token provided"]));
$html = $data['html'] ?? '';
$css = $data['css'] ?? '';
$js = $data['js'] ?? '';

// Verify collaboration
$tokenQuery = "SELECT project_id FROM collaboration_master WHERE share_token = '$shareToken'";
$tokenResult = mysqli_query($conn, $tokenQuery);

if (mysqli_num_rows($tokenResult) > 0) {
    $collaboration = mysqli_fetch_assoc($tokenResult);
    $projectId = $collaboration['project_id'];

    // Combine HTML, CSS, JS into single content
    $projectContent = $html . "/* --- SPLIT --- */" . $css . "/* --- SPLIT --- */" . $js;

    // Update project file directly
    $filename = "./projects/{$projectId}.txt";
    
    if (file_put_contents($filename, $projectContent)) {
        echo json_encode([
            "success" => true,
            "updated" => true
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to update project file"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid collaboration token"
    ]);
}

?>