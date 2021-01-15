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

	//Getting json data being passed from javascript
	$newEventJSON = file_get_contents('php://input');
	$data = json_decode($newEventJSON);

	$sql_updateApprovalCode = "UPDATE events SET approvalcode = 1 WHERE event_id = '$data->event_id'";
	$result_updateApprovalCode = mysqli_query($conn,$sql_updateApprovalCode);
	if(!$result_updateApprovalCode){
		$response->error_connection = "Update Failed";
		echo json_encode($response);
	}else{
		$response->error_connection = "1";
		echo json_encode($response);
	}
?>