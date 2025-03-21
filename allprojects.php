<?php
header('Access-Control-Allow-Origin:http://localhost:3000'); 
header('Content-Type: application/json');

$host = "localhost";
$username = "root";
$password = "";
$database = "editor";
$conn=mysqli_connect($host, $username, $password, $database);

$uid=$_POST['userid'];
$sql1="SELECT username FROM user_master WHERE userid=$uid";
$result = mysqli_query($conn,$sql1);
if($row=mysqli_fetch_assoc($result)){
    $uname=$row['username'];
}
$sql="SELECT project_id,userid,project_name,project_path FROM project_master WHERE userid='$uid'";
$projects = [];
$result = mysqli_query($conn,$sql);
if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result))
     {
       
        $row['full_path'] = "http://localhost/editorbackend/read_project.php?path=" . urlencode($row['project_path']);

       $projects[] = $row;
       
     }
     echo json_encode($projects);
 }
 else{
     echo json_encode([]);
 }
 
?>