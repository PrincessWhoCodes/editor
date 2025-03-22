<?php
header('Access-Control-Allow-Origin:http://localhost:3000');

$host="localhost";
$username="root";
$password = "";
$database="editor";
$conn=mysqli_connect($host,$username,$password ,$database);

$datafor=$_GET['datafor'];

if($datafor == "register"){
    $fname = $_POST['fullname'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pwd = $_POST['pwd'];
    $pfp = $_POST['pfp'];
    $active = 1 ;

    $sql="INSERT INTO user_master (fullname,username,email,pwd,pfp,active) VALUES ('$fname','$name','$email','$pwd','$pfp',$active)";
    if(mysqli_query($conn,$sql)){
       
		$data=array("regstat"=>"success");
        
		echo json_encode($data);
      
	}
	else{
		$data=array("regstat"=>"fail");
		echo json_encode($data);
	}
}
?>
