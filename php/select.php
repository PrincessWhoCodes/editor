<?php
header('Access-Control-Allow-Origin:http://localhost:3000');


$host = "localhost";
$username = "root";
$password = "";
$database = "editor";
$conn=mysqli_connect($host, $username, $password, $database);

$datafor=$_POST['datafor'];

if ($datafor == "login") {
    $email = $_POST['email'];
    $pwd = $_POST['pwd'];

    // Query to check user credentials and their active status
    $sql = "SELECT userid, email, pwd, active, isadmin FROM user_master WHERE email='$email' AND pwd='$pwd'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            
            $data1[] = $row;
        }
        echo json_encode($data1); 
    } else {
      
        echo json_encode([]);
    }
}

else if($datafor == "userprof"){
	$uid = $_POST['uid'];
	$sql="SELECT fullname,username,email,pfp FROM user_master WHERE userid='$uid'";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data4[] = $row;
	}
	echo json_encode($data4);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor == "dash1"){
	
		
$sql_total = "SELECT COUNT(*) AS total_users 
FROM user_master 
WHERE isadmin = '0'"; 
$result_total = mysqli_query($conn, $sql_total);
$totalUsers = 0;

if ($row_total = mysqli_fetch_assoc($result_total)) {
$totalUsers = $row_total['total_users'];
}


$sql_active = "SELECT COUNT(DISTINCT user_master.userid) AS active_regular_users
 FROM user_master 
 JOIN project_master ON user_master.userid = project_master.userid
 WHERE user_master.isadmin = '0'";  
 
$result_active = mysqli_query($conn, $sql_active);
$activeRegularUsers = 0;

if ($row_active = mysqli_fetch_assoc($result_active)) {
$activeRegularUsers = $row_active['active_regular_users'];
}

// Return the results in JSON format
echo json_encode([
"total_users" => $totalUsers,
"active_regular_users" => $activeRegularUsers
]);
}
else if($datafor == "dash2"){
	$sql_total = "SELECT COUNT(*) AS total_users FROM user_master WHERE isadmin = '0'"; 
	$result_total = mysqli_query($conn, $sql_total);
	$totalUsers = 0;

	if ($row_total = mysqli_fetch_assoc($result_total)) {
		$totalUsers = $row_total['total_users'];
	}

	
	$sql_active = "SELECT COUNT(DISTINCT user_master.userid) AS active_users 
				   FROM user_master 
				   JOIN project_master ON user_master.userid = project_master.userid
				   WHERE user_master.isadmin = '0'"; 
	$result_active = mysqli_query($conn, $sql_active);
	$activeUsers = 0;

	if ($row_active = mysqli_fetch_assoc($result_active)) {
		$activeUsers = $row_active['active_users'];
	}

	
	$inactiveUsers = $totalUsers - $activeUsers;


	echo json_encode([
		"total_users" => $totalUsers,
		"active_regular_users" => $activeUsers,
		"inactive_regular_users" => $inactiveUsers
	]);

}
	else if($datafor == "dash3"){
		$sql = "SELECT u.username, 
		COALESCE(COUNT(p.project_id), 0) AS total_projects
 FROM user_master u
 LEFT JOIN project_master p ON u.userid = p.userid
 WHERE u.isadmin = 0
 GROUP BY u.userid";

$result = mysqli_query($conn, $sql);
$data = [];

while ($row = mysqli_fetch_assoc($result)) {
$data[] = [  
 "username" => $row["username"],
 "total_projects" => (int)$row["total_projects"]
  ];
}

     echo json_encode($data);
}
	else if($datafor == "dash4") {
		$sql = "SELECT DATE_FORMAT(u.created_at, '%Y-%u') AS week, COUNT(u.userid) AS new_users 
				FROM user_master u
				WHERE u.isadmin = 0
				GROUP BY DATE_FORMAT(u.created_at, '%Y-%u')
				ORDER BY week DESC";
	
		$result = mysqli_query($conn, $sql);
		$data = [];
	
		while ($row = mysqli_fetch_assoc($result)) {
			$data[] = [
				"week" => $row["week"],  // Fixed: Using "week" instead of "month"
				"user_count" => (int)$row["new_users"] // Matched with frontend
			];
		}
	
		echo json_encode($data);
	}
	
	else if($datafor == "user"){
	
		$sql="SELECT userid,fullname,username,email,active FROM user_master WHERE isadmin='0'";
		$result = mysqli_query($conn,$sql);
		if(mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result))
		{
		  $data[] = $row;
		}
		echo json_encode($data);
		}
		else{
			echo json_encode([]);
		}
	}
	

?>

	
	