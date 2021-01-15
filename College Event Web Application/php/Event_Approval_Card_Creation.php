<?php
	require 'SQL_Creds.php';

	$response = (object) ['error_connection' => ''];
	//$event_search_results = (object) ['event_id' => '','event_name' => '', 'event_category' => '', 'day' => '', 'month', => '', 'year' => '', 'startTime' => '', 'endTime' => '', 'contact_phone' => '', 'contact_email' => '', 'description' => '', 'location' => '', 'longitude' => '', 'latitude' => '', 'creator_id' => '', 'approvalcode' => '', 'school' => ''];

	class EventApproval {
		function __construct() {
			$this->event_id = "";
			$this->event_name = "";
			$this->event_category = "";
			$this->day = "";
			$this->month = "";
			$this->year = "";
			$this->startTime = "";
			$this->endTime = "";
			$this->contact_phone = "";
			$this->contact_email = "";
			$this->description = "";
			$this->location = "";
			$this->longitude = "";
			$this->latitude = "";
			$this->creator_id = "";
			$this->approvalcode = "";
			$this->school = "";
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

	$newEventApprovalJSON = file_get_contents('php://input');
	$data = json_decode($newEventApprovalJSON);
	//checking if a university profile for the specified university already exists
	$sql_eventApproval = "SELECT * FROM events WHERE school = '$data->userSchool' AND approvalcode = 0";
	$result_eventApproval = mysqli_query($conn,$sql_eventApproval);

	$jsonArray = array();

	if(mysqli_num_rows($result_eventApproval) < 0){
		$response->error_connection = "There are no events matching those search parameters";
		echo json_encode($response);
	}else{
			while($row = $result_eventApproval->fetch_assoc())
			{
				$jsonObject = new EventApproval();
				$jsonObject->event_id = $row["event_id"];
				$jsonObject->event_name = $row["event_name"];
				$jsonObject->event_category = $row["event_category"];
				$jsonObject->day = $row["day"];
				$jsonObject->month = $row["month"];
				$jsonObject->year = $row["year"];
				$jsonObject->startTime = $row["startTime"];
				$jsonObject->endTime = $row["endTime"];
				$jsonObject->contact_phone = $row["contact_phone"];
				$jsonObject->contact_email = $row["contact_email"];
				$jsonObject->description = $row["description"];
				$jsonObject->location = $row["location"];
				$jsonObject->longitude = $row["longitude"];
				$jsonObject->latitude = $row["latitude"];
				$jsonObject->creator_id = $row["creator_id"];
				$jsonObject->approvalcode = $row["approvalcode"];
				$jsonObject->school = $row["school"];
				$jsonArray[] = $jsonObject;
			}
		}

		echo json_encode($jsonArray);

		//close connection
		mysqli_close($conn);
?>