<?php
	require 'SQL_Creds.php';

	$response = (object) ['fName' => '','lName' => '', 'userSchool' => '', 'userid' => '', 'usertype' => '', 'error_email' => '', 'error_username' => '', 'error_connection' => ''];

	//Creating a Connection to database
	$conn = mysqli_connect($serverURL,$serverLogin,$serverAuth,$serverDB);
	if(!$conn){
		die("Connection failed: " . mysqli_connect_error());
		$response->error_connection = "Connection Failed";
		echo json_encode($response);
	}

	$newUserJSON = file_get_contents('php://input');
	$data = json_decode($newUserJSON);
	$pass_hash = password_hash($data->userPWD, PASSWORD_DEFAULT);

	//check if email has already been used
	$sql_email = "SELECT * FROM users WHERE email = '$data->email'";
	//check if username has already been used
	$sql_userName = "SELECT * FROM users WHERE userName = '$data->userName'";
	$result_email = mysqli_query($conn,$sql_email);
	$result_userName = mysqli_query($conn,$sql_userName);
	if(mysqli_num_rows($result_email) > 0 && mysqli_num_rows($result_userName) > 0){
		$response->error_email = "Email is Already in Use";
		$response->error_username = "Username is already in Use";
		echo json_encode($response);
	}else if(mysqli_num_rows($result_email) > 0){
		$response->error_email = "Email is Already in Use";
		//$response->error_username = "";
		echo json_encode($response);
	}else if(mysqli_num_rows($result_userName) > 0){
		$response->error_username = "Username is already in use";
		echo json_encode($response);
	}
	else{
		//creating a new user inserting into the database
		if(!($stmt = $conn->prepare("INSERT INTO users (fName, lName, email, userSchool, userName, userPWD, userType) VALUES (?,?,?,?,?,?,?)")))
		{
			$response->error_connection = "Prepare failed:";
			echo json_encode($response);
		}

		if(!$err = $stmt->bind_param("sssssss", $data->fName, $data->lName, $data->email, $data->userSchool, $data->userName, $pass_hash, $data->userType))
		{
			$response->error_connection = "Binding failed:";
			echo json_encode($response);
		}

		if(!$stmt->execute()){
			$response->error_connection = $stmt->error;
			echo json_encode($response);
		}
		else{
			$sql_userid = "SELECT user_id FROM users WHERE userName = '$data->userName'";
			$result_userid = mysqli_query($conn,$sql_userid);
			$queryRows = mysqli_fetch_row($result_userid);

			$response->userid = $queryRows[0];
			$response->usertype = $data->userType;
			$response->fName = $data->fName;
			$response->lName = $data->lName;
			$response->userSchool = $data->userSchool;
			echo json_encode($response);
			$stmt->close();
			//close connection
			mysqli_close($conn);
		}
	}
			//sends response to console log to confirm correct json data is being recived by this php from the form on register page
		/*echo $data->fName;
		echo "\r\n";
		echo $data->lName;
		echo "\r\n";
		echo $data->email;
		echo "\r\n";
		echo $data->userSchool;
		echo "\r\n";
		echo $data->userName;
		echo "\r\n";
		echo $data->userPWD;*/
?>