<?php
	require 'SQL_Creds.php';

	$response = (object) ['error_connection' => ''];

	//Creating a Connection to database
	$conn = mysqli_connect($serverURL,$serverLogin,$serverAuth,$serverDB);
	if(!$conn){
		die("Connection failed: " . mysqli_connect_error());
		$response->error_connection = "Connection Failed";
		echo json_encode($response);
	}

	//echo "Connected Successfully \r\n";

	$newEventJSON = file_get_contents('php://input');
	$data = json_decode($newEventJSON);
	
	//query to check if there is another event that has already been created with conflicting time&date&location
	$sql_event_conflict = "SELECT * FROM events WHERE (day = '$data->eventDay' && month = '$data->eventMonth' && year='$data->eventYear' && startTime = '$data->start_time' && endTime = '$data->end_time' && location = '$data->location')";

	$approvalinitial = 0;
	

	//query that creates the event by adding the information to the database

	$result_event_conflict = mysqli_query($conn,$sql_event_conflict);
	if(mysqli_num_rows($result_event_conflict) > 0){
		$response->error_connection = "There is a conflict as an event is already created for this time and place";
		echo json_encode($response);
	}else{
		//echo "No conflicts exist\r\n";
		//create university profile in database
		if(!($stmt = $conn->prepare("INSERT INTO events(event_name,event_category,day,month,year,startTime,endTime,contact_phone,contact_email,description,location,longitude,latitude,creator_id,approvalcode,school) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")))
		{
			$response->error_connection = "Prepare Failed";
		}
		$result = $stmt->bind_param("ssssssssssssssss", $data->eventName,$data->eventCategory,$data->eventDay,$data->eventMonth,$data->eventYear,$data->start_time,$data->end_time,$data->contact_phone,$data->contact_email,$data->description,$data->location,$data->longitude,$data->latitude,$data->creator_id,$approvalinitial, $data->userSchool);
		
		if(false === $result)
		{
			$response->error_connection = "Binding failed:";
			echo json_encode($response);
		}
		if(!$stmt->execute()){
			$response->error_connection = "Execution failed";
			echo json_encode($response);
		}else{
			$response->error_connection = "Event Successfully Created";
			echo json_encode($response);
			$stmt->close();

			//close connection
			mysqli_close($conn);
		}
	}
?>