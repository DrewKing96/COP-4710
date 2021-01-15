<?php
	require 'SQL_Creds.php';

	$response = (object) ['error_connection' => ''];

	//Creating a Connection to database
	$conn = mysqli_connect($serverURL,$serverLogin,$serverAuth,$serverDB);
	if(!$conn){
		die("Connection failed: " . mysqli_connect_error());
		$response->error_connection = "Unable to connect";
		echo json_encode($response);
	}

	//echo "Connected Successfully \r\n";
	$initialMember = 1;
	$newRSOJSON = file_get_contents('php://input');
	$data = json_decode($newRSOJSON);
	//checking if a university profile for the specified university already exists
	$sql_university = "SELECT * FROM rso WHERE RSO_name = '$data->name' AND RSO_uniassociation = '$data->uni_association'";
	$result_university = mysqli_query($conn,$sql_university);
	if(mysqli_num_rows($result_university) > 0){
		$response->error_connection = "There is a conflict as a RSO Profile is already created for this RSO";
		echo json_encode($response);
	}else{
		echo "University Profile does not exist yet";
		//create university profile in database
		if(!($stmt = $conn->prepare("INSERT INTO rso(RSO_name, RSO_uniassociation,numMembers,admin_id) VALUES (?,?,?,?)")))
		{
			echo "Prepared failed:";
		}
		$stmt->bind_param("ssss", $data->name,$data->uni_association,$initialMember,$data->user_id);

		if(!$stmt->execute()){
			echo "Execute failed";
		}
		$response->error_connection = "University Profile Successfully Created";
		echo json_encode($response);

		$stmt->close();

		//close connection
		mysqli_close($conn);
	}
?>