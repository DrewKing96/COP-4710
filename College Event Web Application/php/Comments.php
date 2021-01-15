<?php
	require 'SQL_Creds.php';

	$response = (object) ['error_connection' => ''];
	//$event_search_results = (object) ['event_id' => '','event_name' => '', 'event_category' => '', 'day' => '', 'month', => '', 'year' => '', 'startTime' => '', 'endTime' => '', 'contact_phone' => '', 'contact_email' => '', 'description' => '', 'location' => '', 'longitude' => '', 'latitude' => '', 'creator_id' => '', 'approvalcode' => '', 'school' => ''];

	class Comment {
		function __construct() {
			$this->comment_id = "";
			$this->event_id = "";
			$this->comment = "";
			$this->user_id = "";
		}
	}

	//Creating a Connection to database
	$conn = mysqli_connect($serverURL,$serverLogin,$serverAuth,$serverDB);
	if(!$conn){
		die("Connection failed: " . mysqli_connect_error());
		$response->error_connection = "Unable to connect";
		echo json_encode($response);
	}

	//echo "Connected Successfully \r\n";

	$newCommentJSON = file_get_contents('php://input');
	$data = json_decode($newCommentJSON);
	if(!($stmt = $conn->prepare("INSERT INTO comments (event_id, comment, user_id) VALUES (?,?,?)")))
		{
			$response->error_connection = "Prepare failed:";
			echo json_encode($response);
		}

		if(!$err = $stmt->bind_param("sss", $data->event_id, $data->comment, $data->user_id))
		{
			$response->error_connection = "Binding failed:";
			echo json_encode($response);
		}

		if(!$stmt->execute()){
			$response->error_connection = $stmt->error;
			echo json_encode($response);
		}
	$sql_getcomments = "SELECT * FROM comments WHERE event_id = '$data->event_id'";
	$result_getcomments = mysqli_query($conn,$sql_getcomments);
	$jsonArray = array();

	if(mysqli_num_rows($result_getcomments) < 0){
		$response->error_connection = "There are no comments for this event";
		echo json_encode($response);
	}else{
			while($row = $result_getcomments->fetch_assoc())
			{
				$jsonObject = new Comment();
				$jsonObject->comment_id = $row["comment_id"];
				$jsonObject->event_id = $row["event_id"];
				$jsonObject->comment = $row["comment"];
				$jsonObject->user_id = $row["user_id"];
				$jsonArray[] = $jsonObject;
			}
		}

		echo json_encode($jsonArray);
	/*else{
		//echo "University Profile does not exist yet";
		//create university profile in database
		if(!($stmt = $conn->prepare("INSERT INTO rso(RSO_name, RSO_uniassociation) VALUES (?,?)")))
		{
			echo "Prepared failed:";
		}
		$stmt->bind_param("ss", $data->name,$data->uni_association);

		if(!$stmt->execute()){
			echo "Execute failed";
		}
		$response->error_connection = "University Profile Successfully Created";
		echo json_encode($response);

		$stmt->close();*/

		//close connection
		mysqli_close($conn);
?>