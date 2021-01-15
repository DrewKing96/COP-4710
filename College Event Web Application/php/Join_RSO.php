<?php
	require 'SQL_Creds.php';

	$response = (object) ['error_connection' => '', 'numMembers' => ''];
	//$event_search_results = (object) ['event_id' => '','event_name' => '', 'event_category' => '', 'day' => '', 'month', => '', 'year' => '', 'startTime' => '', 'endTime' => '', 'contact_phone' => '', 'contact_email' => '', 'description' => '', 'location' => '', 'longitude' => '', 'latitude' => '', 'creator_id' => '', 'approvalcode' => '', 'school' => ''];

	//Creating a Connection to database
	$conn = mysqli_connect($serverURL,$serverLogin,$serverAuth,$serverDB);
	if(!$conn){
		die("Connection failed: " . mysqli_connect_error());
		$response->error_connection = "Unable to connect";
		echo json_encode($response);
	}

	//echo "Connected Successfully \r\n";

	$newRSOJoinJSON = file_get_contents('php://input');
	$data = json_decode($newRSOJoinJSON);
	$sql_RSOAssociationCheck = "SELECT * FROM rso_association WHERE user_id = '$data->user_id' AND RSO_id = '$data->rso_id'";
	$result_RSOAssociationCheck = mysqli_query($conn,$sql_RSOAssociationCheck);
	if(mysqli_num_rows($result_RSOAssociationCheck) > 0){
		$response->error_connection = "1";
		echo json_encode($response);
	}else{
	//checking if a university profile for the specified university already exists
	$sql_RSOJoin = "UPDATE rso SET numMembers = numMembers+1 WHERE RSO_id = '$data->rso_id'";
	$result_eventSearch = mysqli_query($conn,$sql_RSOJoin);

	if(!($stmt = $conn->prepare("INSERT INTO rso_association (user_id, RSO_id) VALUES (?,?)")))
	{
		$response->error_connection = "Prepare failed:";
		echo json_encode($response);
	}
	if(!$err = $stmt->bind_param("ss", $data->user_id, $data->rso_id))
	{
		$response->error_connection = "Binding failed:";
		echo json_encode($response);
	}
	if(!$stmt->execute()){
		$response->error_connection = $stmt->error;
		echo json_encode($response);
	}

	$sql_updatecardNumMembers = "SELECT numMembers FROM rso WHERE RSO_id = '$data->rso_id'";
	$result_updatecardNumMembers = mysqli_query($conn,$sql_updatecardNumMembers);
	if(mysqli_num_rows($result_updatecardNumMembers) < 1){
		$response->error_connection = "search failed";
		echo json_encode($response);
	}else{
		$queryRows = mysqli_fetch_row($result_updatecardNumMembers);
		$response->numMembers = $queryRows[0];
		echo json_encode($response);
	}
	
}
		//close connection
		mysqli_close($conn);
?>