<?php
header('Access-Control-Allow-Origin:http://localhost:3000'); 


$host = "localhost";
$username = "root";
$password = "";
$database = "editor";
$conn=mysqli_connect($host, $username, $password, $database);

$datafor=$_POST['datafor'];

if($datafor == "pfp"){
$uid = $_POST['uid'];
$toDay = date("jnyHis");
if(isset($_FILES['file'])){
$file_name = $_FILES['file']['name'];
$file_size = $_FILES['file']['size'];
$file_tmp = $_FILES['file']['tmp_name'];
$file_type = $_FILES['file']['type'];
$file_n = $toDay.str_replace(' ', '',$file_name);
if(move_uploaded_file($file_tmp,"userpic/".$file_n)){
$sql = "UPDATE user_master SET pfp='$file_n' where userid='$uid'";
if(mysqli_query($conn,$sql)){
		$data=array("regstat"=>"success");
		echo json_encode($data);
	}
	else{
		$data=array("regstat"=>"fail");
		echo json_encode($data);
	}
}
}
}
else if($datafor == "userupd"){
	$keys = array_keys($_POST);
	$key = $keys[0];
	$val = $_POST[$key];
	$uid = $_POST["uid"];
	$sql = "UPDATE user_master SET $key='$val' where userid='$uid'";
	if(mysqli_query($conn,$sql)){
		$data=array("updstat"=>"success");
		echo json_encode($data);
	}
	else{
		$data=array("updstat"=>"fail");
		echo json_encode($data);
	}
}
else if ($datafor == "upduser" ) {
	$userid = $_POST['userid'];
$active = $_POST['active'];


if (isset($userid) && isset($active)) {

    error_log("Updating user status: userId = $userid, new active status = $active");

    
    $sql = "UPDATE user_master SET active = '$active' WHERE userid = '$userid'";

    // Execute the query
    if (mysqli_query($conn, $sql)) {
       
        echo json_encode(['status' => 'success', 'message' => 'User status updated successfully.']);
    } else {
        
        error_log("Error updating user status: " . mysqli_error($conn));
        echo json_encode(['status' => 'error', 'message' => 'Error updating user status.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data provided.']);
}
}

?>