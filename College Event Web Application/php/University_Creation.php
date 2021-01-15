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

	$newUniversityJSON = file_get_contents('php://input');
	$data = json_decode($newUniversityJSON);
	//checking if a university profile for the specified university already exists
	$sql_university = "SELECT * FROM university WHERE institution_name = '$data->institution_name'";
	$result_university = mysqli_query($conn,$sql_university);
	if(mysqli_num_rows($result_university) > 0){
		$response->error_connection = "There is a conflict as an University Profile is already created for this school";
		echo json_encode($response);
	}else{
		echo "University Profile does not exist yet";
		//create university profile in database
		if(!($stmt = $conn->prepare("INSERT INTO university (institution_name,street_address,city,state,zipcode,numStudents,description) VALUES (?,?,?,?,?,?,?)")))
		{
			$response->error_connection = "Prepared failed";
			echo json_encode($response);
		}
		$stmt->bind_param("sssssss", $data->institution_name,$data->street_address,$data->city,$data->state,$data->zipcode,$data->numStudents,$data->description);

		if(!$stmt->execute()){
			$response->error_connection = "Executed failed";
			echo json_encode($respose);
		}
		$response->error_connection = "University Profile Successfully Created";
		echo json_encode($response);

		$stmt->close();

		//close connection
		mysqli_close($conn);
	}
?>