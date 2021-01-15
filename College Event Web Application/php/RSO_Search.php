<?php
	require 'SQL_Creds.php';

	$response = (object) ['error_connection' => ''];

	class RSO {
		function __construct() {
			$this->RSO_id = "";
			$this->RSO_name = "";
			$this->RSO_uniassociation = "";
			$this->numMembers = "";
			$this->admin_id = "";
			$this->activation = "";
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

	$newRSOSearchJSON = file_get_contents('php://input');
	$data = json_decode($newRSOSearchJSON);
	//checking if a university profile for the specified university already exists
	$sql_RSOSearch = "SELECT * FROM rso WHERE RSO_uniassociation = '$data->eventSchool'";
	$result_RSOSearch = mysqli_query($conn,$sql_RSOSearch);

	$jsonArray = array();

	if(mysqli_num_rows($result_RSOSearch) < 0){
		$response->error_connection = "There are no rso's matching those search parameters";
		echo json_encode($response);
	}else{
			while($row = $result_RSOSearch->fetch_assoc())
			{
				$jsonObject = new RSO();
				$jsonObject->RSO_id = $row["RSO_id"];
				$jsonObject->RSO_name = $row['RSO_name'];
				$jsonObject->RSO_uniassociation = $row['RSO_uniassociation'];
				$jsonObject->numMembers = $row['numMembers'];
				$jsonObject->admin_id = $row['admin_id'];
				$jsonObject->activation = $row['activation'];
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