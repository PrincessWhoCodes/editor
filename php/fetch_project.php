<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$input = json_decode(file_get_contents('php://input'), true);

$project_path = $input['project_path']; // File path
$code = $input['code']; // Combined code

file_put_contents($project_path, $code); // Save the code

echo json_encode(["success" => true]);
?>
