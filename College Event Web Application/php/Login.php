<?php
	require("SQL_Creds.php");

	//find way to access users events that are both associated to their account as well as all events associated with there school
	class Event {
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
		$this->school = "";
    }	
}
	//$list_of_events = array((object) ['event_id' => '', 'event_name' => '', 'event_category' => '', 'day' => '', 'month' => '', 'year' => '', 'startTime' => '', 'endTime' => '', 'contact_phone' => '', 'contact_email' => '', 'description' => '', 'location' => '', 'longitude' => '', 'latitude' => '', 'school' => '']);

	$response = (object) ['user_id' => '', 'fName' => '', 'lName' => '', 'userSchool' => '', 'usertype' => '', 'error' => ''];

	//Creating a Connection to database
	$conn = mysqli_connect($serverURL,$serverLogin,$serverAuth,$serverDB);
	if(!$conn){
		die("Connection failed: " . mysqli_connect_error());
		//echo "Connection UnSucessfull \r\n";
	}

	//echo "Connected Successfully \r\n";

	$LoginJSON = file_get_contents('php://input');
	$data = json_decode($LoginJSON);
	//password_verify(password, hash)
	//check if username and password match in database
	$sql_log_check = "SELECT user_id,fName,lName,userSchool,usertype FROM users WHERE userName = '$data->userName'";
	$event_grabber = "SELECT event_id,event_name,event_category,day,month,year,startTime,endTime,contact_phone,contact_email,description,location,longitude,latitude,school FROM events WHERE school = '$response->userSchool'";
	//grabbing the hash value as a string from db where the username matches that which was passed by the user
	$get_hash = "SELECT userPWD FROM users WHERE userName = '$data->userName'";
	$get_hash_query = mysqli_query($conn,$get_hash);
	$get_hash_result = mysqli_fetch_object($get_hash_query);
	
	//$pass_check = password_verify($data->userPWD, $get_hash_result->userPWD);

	//performs sql query from database
	$access_userInfo_query = mysqli_query($conn,$sql_log_check);
	//$test = json_encode($pass_check);
	//echo $test;
	//running php hash check to verify userPWD that was passed by the user to the hashed password stored in the db that is associated with the username
	if(!password_verify($data->userPWD, $get_hash_result->userPWD)){
		$response->error = "Incorrect Username/Password Combination";
		echo json_encode($response);
	}
	else if(mysqli_num_rows($access_userInfo_query) < 1){
		$response->error = "User does not exist in the database";
		echo json_encode($response);
	}else{
		//fetches a single row from query result
		$queryRows = mysqli_fetch_row($access_userInfo_query);
		$response->user_id = $queryRows[0];
		$response->fName = $queryRows[1];
		$response->lName = $queryRows[2];
		$response->userSchool = $queryRows[3];
		$response->usertype = $queryRows[4];

		//$list_of_events[0]->event_id = 33;//$response->user_id;
		//$list_of_events[1]->event_id = 24;
		//$list_of_events[1]->event_id = 33;
		//$response->events = $list_of_events;

		echo json_encode($response);

		//$return = createJSONString($fName,$lName,$userSchool);
		//echo($fName);
		//echo($lName);
		//echo($userSchool);
	}

	//frees result set
	mysqli_free_result($get_hash_query);
	mysqli_free_result($access_userInfo_query);

	//closes the connection
	mysqli_close($conn);
?>