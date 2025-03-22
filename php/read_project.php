<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: text/plain');
header('Content-Type: application/json');

$baseDir = __DIR__ . "/projects/";  

if (!isset($_GET['path']) || empty($_GET['path'])) {
    die("ERROR: Invalid or missing file.");
}

$requestedPath = urldecode($_GET['path']);  
$filePath = __DIR__ . "/" . $requestedPath; 

if (!file_exists($filePath) || !is_file($filePath)) {
    die("ERROR: File not found.");
}


echo file_get_contents($filePath);
?>
