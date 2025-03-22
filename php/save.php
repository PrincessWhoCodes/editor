<?php
header('Access-Control-Allow-Origin:http://localhost:3000'); 
$host = "localhost";
$username = "root";
$password = "";
$database = "editor";
$conn=mysqli_connect($host, $username, $password, $database);

$title = $_POST['pname'];
$toDay = date("jnyHis");
$uid=$_POST['uid'];

$file_name = $_FILES['fupload']['name'];
$file_size = $_FILES['fupload']['size'];
 $file_tmp = $_FILES['fupload']['tmp_name'];
$file_type = $_FILES['fupload']['type'];
// $sql1="SELECT username FROM user_master WHERE userid=$uid";
// $result = mysqli_query($conn,$sql1);
// if($row=mysqli_fetch_assoc($result)){
//     $uname=$row['username'];

$upload_dir = "projects/"; 
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}
move_uploaded_file($file_tmp,"$upload_dir".str_replace(' ', '',$title));
$file_loc = "$upload_dir".str_replace(' ', '',$title);

$sql = "INSERT INTO project_master(userid,project_name,project_path) VALUES ('$uid','$title','$file_loc')";
if(mysqli_query($conn,$sql)){
    $project_id = mysqli_insert_id($conn);
echo json_encode(['success' => true, 'message' => 'Project Saved Successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error while saving project details']);
}


?>