<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database credentials
$host = "localhost";
$username = "root";
$password = "";
$database = "editor";

// Backup file path
$toDay = date('dmY_His');
$backupDir = "C:/Program Files/Wamp/www/editorbackend/Backups/";
$backupFile = "{$backupDir}{$toDay}_DBbak.sql";

// Ensure the backup directory exists
if (!file_exists($backupDir)) {
    mkdir($backupDir, 0777, true);
}

// Create database connection
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["es" => "error", "res" => "Connection failed: " . $conn->connect_error]));
}

// Open backup file
$backupFileHandle = fopen($backupFile, 'w');
if (!$backupFileHandle) {
    die(json_encode(["es" => "error", "res" => "Failed to open backup file"]));
}

// Get all tables
$tablesResult = $conn->query("SHOW TABLES");
while ($row = $tablesResult->fetch_array()) {
    $table = $row[0];

    // Drop table statement
    fwrite($backupFileHandle, "DROP TABLE IF EXISTS `$table`;\n");

    // Get CREATE TABLE statement
    $createTableResult = $conn->query("SHOW CREATE TABLE `$table`");
    $createTableRow = $createTableResult->fetch_array();
    fwrite($backupFileHandle, "\n\n" . $createTableRow[1] . ";\n\n");

    // Get all data from the table
    $rowsResult = $conn->query("SELECT * FROM `$table`");
    while ($row = $rowsResult->fetch_assoc()) {
        $escapedValues = array_map('addslashes', array_values($row)); // Escape values
        $valuesList = "'" . implode("', '", $escapedValues) . "'";
        fwrite($backupFileHandle, "INSERT INTO `$table` VALUES ($valuesList);\n");
    }

    fwrite($backupFileHandle, "\n\n"); 
}


fclose($backupFileHandle);
$conn->close();

echo json_encode(["es" => "success", "res" => "Database backed up successfully", "backupFile" => $backupFile]);
?>
