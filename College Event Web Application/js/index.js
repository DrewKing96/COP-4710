/* Functions Needed */

//logout
//calendar population
//sessions
//return users current rso's they have joined
//add functionality to ensure the user can only join a rso once. if they are part of an rso populate rso the unjoin, if they are not provide option to join rso

function Information(event_name, update_time, event_id)
{
	this.event_name = event_name;
	this.update_time = update_time;
}

function CurrentUser(user_id, fName, lName, userSchool, userType)
{
	this.user_id = user_id;
	this.fName = fName;
	this.lName = lName;
	this.userSchool = userSchool;
	this.userType = userType;
}

//login function
function doLogin()
{
	function userLogin(userName,userPWD){
		this.userName = userName;
		this.userPWD = userPWD;
	}
	document.getElementById("userNameResult").innerHTML = "";
	document.getElementById("pwdResult").innerHTML = "";

	var newUserLogin = new userLogin();
	//getting username and password from form
	newUserLogin.userName = document.getElementById('userName').value;
	newUserLogin.userPWD = document.getElementById('userPWD').value;
	if(newUserLogin.userName.length == 0 && newUserLogin.userPWD.length == 0)
	{
		document.getElementById("userNameResult").innerHTML = "Username is Required";
		document.getElementById("pwdResult").innerHTML = "Password is Required";
		return;
	}

	if(newUserLogin.userName.length == 0)
	{
		document.getElementById("userNameResult").innerHTML = "Username is Required";
		return;
	}

	if(newUserLogin.userPWD.length == 0)
	{
		document.getElementById("pwdResult").innerHTML = "Password is Required";
		return;
	}

	//creating a json string to check username and password
	var loginJSON = JSON.stringify(newUserLogin);

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//recieving and logging request response
			var data = JSON.parse(this.responseText);

			if(data.error == ''){
				
				//hideOrShow("login_creating",false);
				CurrentUser.user_id = data.user_id;
				CurrentUser.fName = data.fName;
				CurrentUser.lName = data.lName;
				CurrentUser.userSchool = data.userSchool;
				CurrentUser.userType = data.usertype;
				user_id = data.user_id;
				fName = data.fName;
				lName = data.lName;
				userSchool = data.userSchool;
				userType = data.usertype;
				console.log(data.user_id);
				window.userid = data.user_id;
				window.fName = data.fName;
				window.lName = data.lName;
				window.userSchool = data.userSchool;
				window.userType = data.userType;

				if(CurrentUser.userType == 1){
					switchToDash();
					createNavStudent(document.getElementById('navbar'), CurrentUser.user_id);
				}
				if(CurrentUser.userType == 2){
					switchToDash();
					createNavAdmin(document.getElementById('navbar'), CurrentUser.user_id);
				}
				if(CurrentUser.userType == 3){
					switchToDash();
					createNavSuperAdmin(document.getElementById('navbar'), CurrentUser.user_id);
					doEventApprovalCardCreation();
				} 

				//document.getElementById("welcomeMess").innerHTML = data.fName + '' + data.lName;
			}
			else{
				document.getElementById("pwdResult").innerHTML = data.error;
				return;
			}
		}
	}
	xhr.open("POST", "php/Login.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(loginJSON);
}

//register function
function doRegister()
{
	//user object
	function User(fName,lName,email,userSchool,userName,userPWD,userType) {
		this.fName = fName;
		this.lName = lName;
		this.email = email;
		this.userSchool = userSchool;
		this.userName = userName;
		this.userPWD = userPWD;
		this.userType = userType;
	}

	var newUser = new User();
	//obtaining the First name from register form
	newUser.fName = document.getElementById('fName').value;
	newUser.lName = document.getElementById('lName').value;
	newUser.email = document.getElementById('email').value;
	newUser.userSchool = document.getElementById('userSchool').value;
	newUser.userName = document.getElementById('userName').value;
	newUser.userPWD = document.getElementById('userPWD').value;
	newUser.userType = document.getElementById('userType').value;
	console.log(newUser.userType);
	document.getElementById('email_result').innerHTML = "";
	document.getElementById('username_result').innerHTML = "";
	document.getElementById('register_result').innerHTML = "";

	/*document.getElementById('fName').value = '';
	document.getElementById('lName').value = '';
	document.getElementById('email').value = '';
	document.getElementById('userSchool').value = '';
	document.getElementById('userName').value = '';
	document.getElementById('userPWD').value = '';*/

	if(newUser.fName.length == 0 || newUser.lName.length == 0 || newUser.email.length == 0 || newUser.userSchool.length == 0 || newUser.userName.length == 0 || newUser.userPWD.length == 0 || newUser.userPWD.length == 0 || newUser.userType.length == 0)
	{
		document.getElementById("register_result").innerHTML = "One or more fields are incorrect";
		return;
	}
	//creating a json string from current new user object
	var newUserJSON = JSON.stringify(newUser);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//reciving request response
			var data = JSON.parse(this.responseText);
			console.log(data.fName);
			console.log(data.lName);
			console.log(data.userSchool);
			console.log(data.error_email);
			console.log(data.error_username);
			console.log(data.error_connection);
			console.log(data.userid);
			console.log(data.usertype);
			//document.getElementById("email_result").innerHTML = data.error_email;
			//document.getElementById("username_result").innerHTML = data.error_username;
		if(data.error_email == '' && data.error_username == '' && data.error_connection == ''){
				var fName = data.fName;
				var lName = data.lName;
				var userSchool = data.userSchool;
				document.getElementById('fName').value = '';
				document.getElementById('lName').value = '';
				document.getElementById('email').value = '';
				document.getElementById('userSchool').value = '';
				document.getElementById('userName').value = '';
				document.getElementById('userPWD').value = '';

				location.href = "index.html";
			}else{
				document.getElementById("email_result").innerHTML = data.error_email;
				document.getElementById("username_result").innerHTML = data.error_username;
			}
		}
	}
	xhr.open("POST", "php/Register.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(newUserJSON);
	
	//window.location.replace('../index.html');
}

function hideOrShow(elementId, showState)
{
	var visible = "visible";
	var display = "block";
	if(!showState)
	{
		visible = "hidden";
		display = "none";
	}

	document.getElementById(elementId).style.visiblility = visible;
	document.getElementById(elementId).style.display = display;
}

function switchToRegister(){
	location.href = "register.html";
	//document.getElementById("login_creating").style.visiblility = "hidden";
	//document.getElementById("login_creating").style.display = "none";
	//document.getElementById("register_creating").style.visiblility = "visible";
	//document.getElementById("register_creating").style.display = "block";
}

function switchToLogin(){
	location.href = "index.html";
}

function switchToEC(){
	hideOrShow('dashboard', false);
	hideOrShow('index_page', false);
	hideOrShow('rso', false);
	hideOrShow('university_profile_creation', false);
	hideOrShow('event_creation', true);
}

function switchToDash(){
	hideOrShow('index_page', false);
	hideOrShow('rso', false);
	hideOrShow('event_creation', false);
	hideOrShow('university_profile_creation', false);
	hideOrShow('dashboard', true);
}

function switchToRSO(){
	hideOrShow('index_page', false);
	hideOrShow('event_creation', false);
	hideOrShow('dashboard', false);
	hideOrShow('university_profile_creation', false);
	hideOrShow('rso', true);
}

function switchToUniCreation(){
	hideOrShow('index_page', false);
	hideOrShow('event_creation', false);
	hideOrShow('dashboard', false);
	hideOrShow('rso', false);
	hideOrShow('university_profile_creation', true);
}

//university profile creation
function doUniProfileCreation(){
	function uniProfile(institution_name,street_address,city,state,zipcode,numStudents,description){
		this.institution_name = institution_name;
		this.street_address = street_address;
		this.city = city;
		this.state = state;
		this.zipcode = zipcode;
		this.numStudents = numStudents;
		this.description = description;
	}

	var newUniProfile = new uniProfile();

	newUniProfile.institution_name = document.getElementById("university_name").value;
	newUniProfile.street_address = document.getElementById("university_address").value;
	newUniProfile.city = document.getElementById("university_city").value;
	newUniProfile.state = document.getElementById("university_state").value;
	newUniProfile.zipcode = document.getElementById("university_zipcode").value;
	newUniProfile.numStudents = document.getElementById("num_students").value;
	newUniProfile.description = document.getElementById("university_description").value;

	if(newUniProfile.institution_name.length == 0){
		document.getElementById("university_name_result").innerHTML = "Name of University is Required";
		return;
	}		
	if(newUniProfile.street_address.length == 0){
		document.getElementById("university_address_result").innerHTML = "Something is missing in the University's Address";
		return;
	} 
	if(newUniProfile.city.length == 0){
		document.getElementById("university_address_result").innerHTML = "Something is missing in the University's Address";
		return;
	} 
	if(newUniProfile.state.length == 0){
		document.getElementById("university_address_result").innerHTML = "Something is missing in the University's Address";
		return;
	}
	if(newUniProfile.zipcode.length == 0){
		document.getElementById("university_address_result").innerHTML = "Something is missing in the University's Address";
		return;
	}
	if(newUniProfile.numStudents.length == 0){
		document.getElementById("university_numStudents_result").innerHTML = "The Number of Students at the University is Required";
		return;
	}
	if(newUniProfile.description.length == 0)
	{
		document.getElementById("university_description_result").innerHTML = "A description of the University is Required";
		return;
	}
	//creating a json string from current new user object
	var newUniProfileJSON = JSON.stringify(newUniProfile);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//reciving request response
			//console.log(this.responseText);
			var data = JSON.parse(this.responseText);
			console.log(data.error_connection);
			}
		}
	xhr.open("POST", "php/University_Creation.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(newUniProfileJSON);

	//document.getElementById('university_name').reset();
	
	//window.location.replace('../index.html');
}

function doEventCreation(){
	function event(eventName,eventCategory,eventDay,eventMonth,eventYear,start_time,end_time,contact_phone,contact_email,location,description, longitude,latitude,creator_id, userSchool){
		this.eventName = eventName;
		this.eventCategory = eventCategory;
		this.eventDay = eventDay;
		this.eventMonth = eventMonth;
		this.eventYear = eventYear;
		this.start_time = start_time;
		this.end_time = end_time;
		this.contact_phone = contact_phone;
		this.contact_email = contact_email;
		this.location = location;
		this.description = description;
		this.longitude = longitude;
		this.latitude = latitude;
		this.creator_id = creator_id;
		this.userSchool = userSchool;
		//this.approvalCode = approvalCode;
	}

	var newEvent = new event();

	newEvent.eventName = document.getElementById("eventName").value;
	newEvent.eventCategory = document.getElementById("eventCategory").value;
	newEvent.eventDay = document.getElementById("date").value;
	newEvent.eventMonth = document.getElementById("Month").value;
	newEvent.eventYear = document.getElementById("Year").value;
	newEvent.start_time = document.getElementById("start_time").value;
	newEvent.end_time = document.getElementById("end_time").value;
	newEvent.contact_phone = document.getElementById("PhoneNumber").value;
	newEvent.contact_email = document.getElementById("Email").value;
	newEvent.location = "test";
	newEvent.description = "test";
	newEvent.longitude = 0;
	newEvent.latitude = 0;
	newEvent.creator_id = window.userid;
	newEvent.userSchool = window.userSchool;
	//newEvent.approvalCode = 0;
	console.log(window.userid);
	console.log(window.userSchool);
	//console.log(CurrentUser.user_id);
	//console.log(userid);


	if(newEvent.eventName.length == 0)
	{
		document.getElementById("eventName_Result").innerHTML = "Event Name is Required";
		return;
	}
	if(newEvent.eventCategory.length == 0)
	{
		document.getElementById("eventCategory_Result").innerHTML = "Event Category is Required";
		return;
	}
	if(newEvent.eventDay.length == 0 || newEvent.eventMonth.length == 0 || newEvent.eventYear.length == 0)
	{
		document.getElementById("eventDate_Result").innerHTML = "Invalid Date";
		return;
	}

	if(newEvent.start_time.length == 0 || newEvent.end_time.length == 0)
	{
		document.getElementById("eventTime_Result").innerHTML = "Invalid Time";
		return;
	}
	if(newEvent.contact_phone.length == 0 || newEvent.contact_email.length == 0)
	{
		document.getElementById("eventContact_Result").innerHTML = "Missing Contact Information";
		return;
	}

	//creating a json string from current new user object
	var newEventJSON = JSON.stringify(newEvent);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//reciving request response
			//var data = JSON.parse(this.responseText);
			var data = JSON.parse(this.responseText);
			console.log(data.error_connection);
			if(data.error_connection == 'Event Successfully Created')
			{
				switchToDash();
			}
			else{
				document.getElementById("eventContact_Result").innerHTML = data.error_connection;
			}
			}
		}
	xhr.open("POST", "php/Event_Creation.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(newEventJSON);
}

function doEventSearch(){
	document.getElementById('card-container').innerText = '';

	function eventSearch(eventSchool, eventLocation){
		this.eventSchool = eventSchool;
		this.eventLocation = eventLocation;
	}

	var newEventSearch = new eventSearch();

	newEventSearch.eventSchool = document.getElementById("eventSchool").value;
	newEventSearch.eventLocation = document.getElementById("eventLocation").value;
	console.log(newEventSearch.eventSchool);
	console.log(newEventSearch.eventLocation);
	//creating a json string from current new user object
	var newEventSearchJSON = JSON.stringify(newEventSearch);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//reciving request response
			console.log(this.responseText);
			eventSearch = JSON.parse(this.responseText);
				if(eventSearch != null)
				{
					let cardContainer;
					//console.log("event search function is reached");

   					cardContainer = document.getElementById('card-container');
    				for(var i=0;i<eventSearch.length;i++)
    				{
    					//let x = new Information(info[i],i,i);
    					createEventCard(eventSearch[i],cardContainer);
        			}
				}
			}
		}
	xhr.open("POST", "php/Event_Search.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(newEventSearchJSON);
}

function doRSOCreation(){

	function rso(name,uni_association,user_id){
		this.name = name;
		this.uni_association = uni_association;
		this.user_id = user_id;
	}

	var newRSO = new rso();
	newRSO.name = document.getElementById("rso_name").value;
	newRSO.uni_association = document.getElementById("rso_university").value;
	newRSO.user_id = window.userid;
	console.log(newRSO.user_id);

	if(newRSO.name == 0){
		document.getElementById("rso_name_result").innerHTML = "A Name for the RSO is required";
	}
	
	//creating a json string
	var newRSOJSON = JSON.stringify(newRSO);

	//using XMLHTTPRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//reciving request response
			//console.log(this.responseText);
			var data = JSON.parse(this.responseText);
			//console.log(data);
			}
		}
	xhr.open("POST", "php/RSO_Creation.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(newRSOJSON);
}

function doRSOSearch(){
	document.getElementById('card-container').innerText = '';

	function RSOSearch(eventSchool){
		this.eventSchool = eventSchool;
	}

	var newRSOSearch = new RSOSearch();

	newRSOSearch.eventSchool = document.getElementById("RSOSchool").value;
	//console.log(newRSOSearch.eventSchool);
	//creating a json string from current new user object
	var newRSOSearchJSON = JSON.stringify(newRSOSearch);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//reciving request response
			//console.log(this.responseText);
			rsoSearch = JSON.parse(this.responseText);
				if(rsoSearch != null)
				{
					let rsoCardContainer;
					//console.log("event search function is reached");
					console.log(rsoSearch);
   					rsoCardContainer = document.getElementById('card-container');
    				for(var i=0;i<rsoSearch.length;i++)
    				{
    					//let x = new Information(info[i],i,i);
    					createCard(rsoSearch[i],rsoCardContainer);
        			}
				}
			}
		}
	xhr.open("POST", "php/RSO_Search.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(newRSOSearchJSON);
}

function doEventApprovalCardCreation(){

	function Approval(userSchool){
		this.userSchool = userSchool;
	}
	var newEventApproval = new Approval();
	//getting userschool for current user
	newEventApproval.userSchool = window.userSchool;
	//creating a json string from current new user object
	var newEventApprovalJSON = JSON.stringify(newEventApproval);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var eventApproval = JSON.parse(this.responseText);
			cardContainer = document.getElementById('card-container');
			for(var i=0;i<eventApproval.length;i++)
    				{
    					createApprovalCard(eventApproval[i],cardContainer);
        			}
			}
		}
	xhr.open("POST", "php/Event_Approval_Card_Creation.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(newEventApprovalJSON);
}

function createEventCard(task,cardContainer){

    let card = document.createElement('a');
    card.className = 'card';
    card.setAttribute('href', '#');
    card.setAttribute('style', 'height:20rem;margin-left:10px;text-decoration:none !important;color:inherit;border:1px solid #0f2862;');

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    let row1 = document.createElement('div');
	row1.className = 'row';
	let col1 = document.createElement('div');
	col1.className = 'col';
	let col2 = document.createElement('div');
	col2.className = 'col';

	let row2 = document.createElement('div');
	row2.className = 'row';
	let col3 = document.createElement('div');
	col3.className = 'col';
	let col4 = document.createElement('div');
	col4.className = 'col';
	let col5 = document.createElement('div');
	col5.className = 'col';

	let row3 = document.createElement('div');
	row3.className = 'row';
	let col6 = document.createElement('div');
	col6.className = 'col';
	let col7 = document.createElement('div');
	col7.className = 'col';

	let row4 = document.createElement('div');
	row4.className = 'row';
	let col8 = document.createElement('div');
	col8.className = 'col';
	let col9 = document.createElement('div');
	col9.className = 'col';

	let row5 = document.createElement('div');
	row5.className = 'row';
	let col10 = document.createElement('div');
	col10.className = 'col';

	let row6 = document.createElement('div');
	row6.className = 'row';
	let col11 = document.createElement('div');
	col11.className = 'col';

	let row7 = document.createElement('div');
	row7.className = 'row';
	let col12 = document.createElement('div');
	col12.className = 'col';

	let br = document.createElement('br');


    let event_name = document.createElement('div');
    //let event_name_icon = document.createElement('i');
    event_name.innerText = 'Event Name: ' + task.event_name;
    event_name.className = 'card-event_name';

    let event_category = document.createElement('div');
    event_category.innerText = 'Category: ' + task.event_category;
    event_category.className = 'card-event_category';

    let date = document.createElement('div');
    date.innerText = 'Date: ' + task.day + ' ' + task.month + ' ' + task.year;
    date.className = 'card-date';

    let startTime = document.createElement('div');
    startTime.innerText = 'Start Time: ' + task.startTime;
    startTime.className = 'card-startTime';

    let endTime = document.createElement('div');
    endTime.innerText = 'End Time: ' + task.endTime;
    endTime.className = 'card-endTime';

    let contact_phone = document.createElement('div');
    contact_phone.innerText = 'Contact Phone: ' + task.contact_phone;
    contact_phone.className = 'card-contact_phone';

    let contact_email = document.createElement('div');
    contact_email.innerText = 'Contact Email: ' + task.contact_email;
    contact_email.className = 'card-contact_email';

    let location = document.createElement('div');
    location.innerText = 'Event Location: ' + task.location;
    location.className = 'card-location';

    let message = document.createElement('textarea');
    message.className = '"text-area form-control"';
    message.placeholder = 'Comments';
    message.id = 'Comments';

    let add = document.createElement('button');
    add.innerText = 'Add';
    add.className = 'btn btn-outline-success btn-block';
    add.onclick = function(){addComment(task.event_id, document.getElementById("Comments"));};
    add.setAttribute('type', 'button');
    add.setAttribute('style', 'margin-right:10px;');

    col1.appendChild(event_name);
    col2.appendChild(event_category);

    col3.appendChild(date);

    col6.appendChild(startTime);
    col7.appendChild(endTime);

    col8.appendChild(contact_phone);
    col9.appendChild(contact_email);

    col10.appendChild(location);

    col11.appendChild(message);

    col12.appendChild(add);

    row1.appendChild(col1);
    row1.appendChild(col2);

    row2.appendChild(col3);

    row3.appendChild(col6);
    row3.appendChild(col7);

    row4.appendChild(col8);
    row4.appendChild(col9);

    row5.appendChild(col10);
    row5.appendChild(br);

    row6.appendChild(col11);
    row6.appendChild(br);

    row7.appendChild(col12);

    cardBody.appendChild(row1);
    cardBody.appendChild(row2);
    cardBody.appendChild(row3);
    cardBody.appendChild(row4);
    cardBody.appendChild(row5);
    cardBody.appendChild(row6);
    cardBody.appendChild(row7);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}

function createCard(task,cardContainer){

	let card = document.createElement('a');
    card.className = 'card';
    card.setAttribute('style', 'height:10rem;margin-left:10px;text-decoration:none !important;color:inherit;border:1px solid #0f2862;');

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    let row1 = document.createElement('div');
	row1.className = 'row';
	let col1 = document.createElement('div');
	col1.className = 'col';

	let row2 = document.createElement('div');
	row2.className = 'row';
	let col3 = document.createElement('div');
	col3.className = 'col';

	let row3 = document.createElement('div');
	row3.className = 'row';
	let col6 = document.createElement('div');
	col6.className = 'col';

	let row4 = document.createElement('div');
	row4.className = 'row';
	let col8 = document.createElement('div');
	col8.className = 'col';
	//console.log(task.RSO_name);
    let rso_name = document.createElement('div');
    //let event_name_icon = document.createElement('i');
    rso_name.innerText = 'RSO Name: ' + task.RSO_name;
    rso_name.className = 'card-rso_name';

    let rso_uniassociation = document.createElement('div');
    rso_uniassociation.innerText = 'School Association: ' + task.RSO_uniassociation;
    rso_uniassociation.className = 'card-rso_uniassociation';

    let numMembers = document.createElement('div');
    numMembers.innerText = 'Number of Members: ' + task.numMembers;
    numMembers.className = 'card-numMembers';
    numMembers.id = task.RSO_id;

    let activation = document.createElement('div');
    if(task.numMembers < 5){
    activation.innerText = 'Non-Active';
	}
	else{
		activation.innerText = 'Active';
	}
    activation.className = 'card-activation';
    activation.id = 'state' + task.RSO_id;

   	let join = document.createElement('button');
    join.innerText = 'Join';
    join.className = 'btn btn-outline-success btn-block';
    join.onclick = function(){joinRso(task.RSO_id,task.numMembers);};
    join.setAttribute('type', 'button');
    join.setAttribute('style', 'margin-right:10px;');

   /* let unjoin = document.createElement('button');
    unjoin.innerText = 'Remove';
    unjoin.className = 'btn btn-outline-warning btn-block';
    unjoin.onclick = function(){unjoinRso(task.RSO_id);};
    unjoin.setAttribute('type', 'button');
    unjoin.setAttribute('style', 'margin-right:10px;');*/
    col1.appendChild(rso_name);

    col3.appendChild(rso_uniassociation);

    col6.appendChild(numMembers);

    col8.appendChild(activation);

    row1.appendChild(col1);

    row2.appendChild(col3);

    row3.appendChild(col6);

    row4.appendChild(col8);

    cardBody.appendChild(row1);
    cardBody.appendChild(row2);
    cardBody.appendChild(row3);
    cardBody.appendChild(row4);
    cardBody.appendChild(join);
    //cardBody.appendChild(unjoin);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}

function joinRso(rso_id, numMembers){
	//console.log(rso_id);
	function RSOJoin(rso_id,user_id){
		this.rso_id = rso_id;
		this.user_id = user_id;
	}

	var newRSOJoin = new RSOJoin();
	newRSOJoin.rso_id = rso_id;
	newRSOJoin.user_id = window.userid;
	//console.log("non-window" + userid);	
	//console.log("window" + userid);
	console.log("rsojoin object user_id: " + newRSOJoin.user_id);
	console.log("rsojoin object rso_id: " + newRSOJoin.rso_id);
	//creating a json string from current new user object
	var newRSOJoinJSON = JSON.stringify(newRSOJoin);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//reciving request response
			console.log(this.responseText);
			var newNumMembers = JSON.parse(this.responseText);
			if(newNumMembers.error_connection == ''){
			document.getElementById(rso_id).innerText = 'Number of Members: ' + newNumMembers.numMembers;
				console.log(numMembers);
			}
			if(newNumMembers.numMembers > 4){
				document.getElementById('state'+ rso_id).innerText = "Active";
			}	
			//console.log(window.userid);			
			}
		}
	xhr.open("POST", "php/Join_RSO.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(newRSOJoinJSON);

}

function unjoinRso(rso_id){
	console.log(rso_id);
	function RSORemove(rso_id,user_id){
		this.rso_id = rso_id;
		this.user_id = user_id;
	}

	var newRSORemove = new RSORemove();
	newRSORemove.rso_id = rso_id;
	console.log(newRSORemove.rso_id);
	//creating a json string from current new user object
	var newRSOJoinJSON = JSON.stringify(newRSOJoin);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//reciving request response
			console.log(this.responseText);
			//rsoJoin = JSON.parse(this.responseText);
				
			}
		}
	xhr.open("POST", "php/Remove_RSO.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(newRSORemoveJSON);
}

function doEventApprove(event_id){
	function Event(event_id){
		this.event_id = event_id;
	}

	var newEvent = new Event();
	newEvent.event_id = event_id;

	//console.log("Event Object event_id: " + newEvent.event_id);

	var newEventJSON = JSON.stringify(newEvent);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//checking data that is received and any errors passed by php
			//console.log(this.responseText);

			//json returned by php
			var data = JSON.parse(this.responseText);
			//console.log(data.error_connection);
			if(data.error_connection == 1){
				hideOrShow(event_id, false);
			}

		}
	}

	xhr.open("POST", "php/ApproveEvent.php", true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(newEventJSON);
}

function doDeny(event_id){
	function Event(event_id){
		this.event_id = event_id;
	}

	var newEvent = new Event();
	newEvent.event_id = event_id;

	//console.log("Event Object event_id: " + newEvent.event_id);

	var newEventJSON = JSON.stringify(newEvent);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//checking data that is received and any errors passed by php
			//console.log(this.responseText);

			//json returned by php
			var data = JSON.parse(this.responseText);
			//console.log(data.error_connection);
			if(data.error_connection == 1){
				hideOrShow(event_id, false);
			}

		}
	}

	xhr.open("POST", "php/DenyEvent.php", true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(newEventJSON);
}

/*function addComment(event_id, comment){
	function Comment(event_id,comment,user_id)
	{
		this.event_id = event_id;
		this.comment = comment;
		this.user_id = user_id;
	}

	var newComment = new Comment();
	newComment.event_id = event_id;
	newComment.comment = comment;
	newComment.user_id = window.userid;
	//console.log(newRSOJoin.rso_id);
	//creating a json string from current new user object
	var newCommentJSON = JSON.stringify(newComment);

	//using XMLHttpRequest to send data to server
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//reciving request response
			var comment = JSON.parse(this.responseText);
			console.log(comment);
			//rsoJoin = JSON.parse(this.responseText);
				
			}
		}
	xhr.open("POST", "php/Comments.php", true);
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(newCommentJSON);
}*/

function createApprovalCard(task,cardContainer){

    let card = document.createElement('a');
    card.className = 'card';
    //card.setAttribute('href', '#');
    card.setAttribute('style', 'height:10rem;margin-left:10px;text-decoration:none !important;color:inherit;border:1px solid #0f2862;')
    card.id = task.event_id;

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let event_name = document.createElement('h5');
    let event_name_icon = document.createElement('i');
    event_name.innerText = "Event Name: " + task.event_name;
    event_name.className = 'card-event_name';

    let date = document.createElement('div');
    date.innerText = "Date: " +  task.day + " " + task.month + " " + task.year;
    date.className = 'card-date';

    let row = document.createElement('div');
    row.className = 'row';
    row.setAttribute('style', 'margin-right:10px;')

    let col1 = document.createElement('div');
    col1.className = 'col';

    let approve = document.createElement('button');
    approve.innerText = 'Approve';
    approve.className = 'btn btn-outline-success btn-block';
    approve.setAttribute('type', 'button');
    approve.onclick = function(){doEventApprove(task.event_id);};
    approve.setAttribute('style', 'margin-right:10px;margin-left:10px;');

    let col2 = document.createElement('div');
    col2.className = 'col';

    let deny = document.createElement('button');
    deny.innerText = 'Deny';
    deny.className = 'btn btn-outline-danger btn-block';
    deny.setAttribute('type', 'button');
    deny.onclick = function(){doDeny(task.event_id);};
    deny.setAttribute('style', 'margin-right:10px;margin-left:10px');

    let br = document.createElement('br');

    col1.appendChild(approve);
    col2.appendChild(deny);
    row.appendChild(col1);
    row.appendChild(col2);
    cardBody.appendChild(event_name);
    cardBody.appendChild(date);
    cardBody.appendChild(br);
    cardBody.appendChild(br);
    cardBody.appendChild(row);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}

function createNavStudent(navBarContainer)
{
	let navBar = document.createElement('nav')
	navBar.className = 'navbar navbar-light bg-light';
	navBar.setAttribute('style', 'width:100%;overflow:hidden;border-bottom:10px solid #0f2862;');
	let row = document.createElement('div');
	row.className = 'row';
	let col1 = document.createElement('div');
	col1.className = 'col';
	let col2 = document.createElement('div');
	col2.className = 'col';
	let col3 = document.createElement('div');
	col3.className = 'col';
	let col4 = document.createElement('div');
	col4.className = 'col';
	col4.setAttribute('style','width:17rem;');
	let navbar_brand = document.createElement('a');
	navbar_brand.className = 'navbar-brand';
	navbar_brand.setAttribute('href','index.html');
	navbar_brand.setAttribute('style','text-decoration:none !important;color:inherit;');
	navbar_brand.innerText = 'Event Tracker';
	let navbar_home_link = document.createElement('a');
	navbar_home_link.className = 'nav-link';
	navbar_home_link.setAttribute('href', 'index.html');
	navbar_home_link.setAttribute('style', 'text-decoration:none !important;color:inherit;');
	navbar_home_link.innerText = 'Logout';
	let navbar_dashboard = document.createElement('button');
	navbar_dashboard.className = 'nav-link';
	navbar_dashboard.setAttribute('onclick','switchToDash()');
	navbar_dashboard.setAttribute('style', 'text-decoration:none !important;color:inherit;background-color:#f8f9fa;border:none;cursor:pointer;');
	navbar_dashboard.innerText = 'Dashboard';
	let navbar_RSO_creation = document.createElement('button');
	navbar_RSO_creation.className = 'nav-link';
	navbar_RSO_creation.setAttribute('onclick','switchToRSO()');
	navbar_RSO_creation.setAttribute('style', 'text-decoration:none !important;border:none;cursor:pointer;background-color:#f8f9fa;color:inherit;');
	navbar_RSO_creation.innerText = 'RSO Creation';

	col1.appendChild(navbar_brand);
	col2.appendChild(navbar_home_link);
	col3.appendChild(navbar_dashboard);
	col4.appendChild(navbar_RSO_creation);
	row.appendChild(col1);
	row.appendChild(col2);	
	row.appendChild(col3);
	row.appendChild(col4);
	navBar.appendChild(row);
	navBarContainer.appendChild(navBar);
}

function createNavAdmin(navBarContainer,user_id)
{
	let navBar = document.createElement('nav')
	navBar.className = 'navbar navbar-light bg-light';
	navBar.setAttribute('style', 'width:100%;overflow:hidden;border-bottom:10px solid #0f2862;');
	let row = document.createElement('div');
	row.className = 'row';
	let col1 = document.createElement('div');
	col1.className = 'col';
	col1.setAttribute('style','width:10rem;font-size:13px;');
	let col2 = document.createElement('div');
	col2.className = 'col';
	col2.setAttribute('style','width:10rem;font-size:13px;');
	let col3 = document.createElement('div');
	col3.className = 'col';
	col3.setAttribute('style','width:10rem;font-size:13px;');
	let col4 = document.createElement('div');
	col4.className = 'col';
	col4.setAttribute('style','width:40rem;font-size:13px');
	let col5 = document.createElement('div');
	col5.className = 'col';
	col5.setAttribute('style','width:40rem;');
	col5.setAttribute('style','width:40rem;font-size:13.5px');
	let navbar_brand = document.createElement('a');
	navbar_brand.className = 'navbar-brand';
	navbar_brand.setAttribute('href','index.html');
	navbar_brand.setAttribute('style','text-decoration:none !important;color:inherit;');
	navbar_brand.innerText = 'Event Tracker';
	let navbar_home_link = document.createElement('a');
	navbar_home_link.className = 'nav-link';
	navbar_home_link.setAttribute('href', 'index.html');
	navbar_home_link.setAttribute('style', 'text-decoration:none !important;color:inherit;');
	navbar_home_link.innerText = 'Logout';
	let navbar_dashboard = document.createElement('button');
	navbar_dashboard.className = 'nav-link';
	navbar_dashboard.setAttribute('onclick','switchToDash()');
	navbar_dashboard.setAttribute('style', 'text-decoration:none !important;color:inherit;background-color:#f8f9fa;border:none;cursor:pointer;');
	navbar_dashboard.innerText = 'Dashboard';
	let navbar_event_creation = document.createElement('button');
	navbar_event_creation.className = 'nav-link';
	navbar_event_creation.setAttribute('onclick','switchToEC()');
	navbar_event_creation.setAttribute('style', 'text-decoration:none !important;border:none;cursor:pointer;background-color:#f8f9fa;color:inherit;');
	navbar_event_creation.innerText = 'Event Creation';
	let navbar_RSO_creation = document.createElement('button');
	navbar_RSO_creation.className = 'nav-link';
	navbar_RSO_creation.setAttribute('onclick','switchToRSO()');
	navbar_RSO_creation.setAttribute('style', 'text-decoration:none !important;border:none;cursor:pointer;background-color:#f8f9fa;color:inherit;');
	navbar_RSO_creation.innerText = 'RSO Creation';

	col1.appendChild(navbar_brand);
	col2.appendChild(navbar_home_link);
	col3.appendChild(navbar_dashboard);
	col4.appendChild(navbar_event_creation);
	col5.appendChild(navbar_RSO_creation);
	row.appendChild(col1);
	row.appendChild(col2);	
	row.appendChild(col3);
	row.appendChild(col4);
	row.appendChild(col5);
	navBar.appendChild(row);
	navBarContainer.appendChild(navBar);
}

function createNavSuperAdmin(navBarContainer,user_id)
{
	let navBar = document.createElement('nav')
	navBar.className = 'navbar navbar-light bg-light';
	navBar.setAttribute('style', 'width:100%;overflow:hidden;border-bottom:10px solid #0f2862;');
	let row = document.createElement('div');
	row.className = 'row';
	let col1 = document.createElement('div');
	col1.className = 'col';
	let col2 = document.createElement('div');
	col2.className = 'col';
	col2.setAttribute('style', 'font-size:13px;');
	let col3 = document.createElement('div');
	col3.className = 'col';
	col3.setAttribute('style', 'font-size:13px;');
	let col4 = document.createElement('div');
	col4.className = 'col';
	col4.setAttribute('style', 'font-size:13px;');
	let col5 = document.createElement('div');
	col5.className = 'col';
	col5.setAttribute('style', 'font-size:13px; width: 20%;');
	let navbar_brand = document.createElement('a');
	navbar_brand.className = 'navbar-brand';
	navbar_brand.setAttribute('href','index.html');
	navbar_brand.setAttribute('style','text-decoration:none !important;color:inherit;');
	navbar_brand.innerText = 'Event Tracker';
	let navbar_home_link = document.createElement('button');
	navbar_home_link.className = 'nav-link';
	navbar_home_link.setAttribute('onclick', 'switchToLogin()');
	navbar_home_link.setAttribute('style', 'text-decoration:none !important;border:none;cursor:pointer;width:150px;height:55px;background-color:#f8f9fa;color:inherit;');
	navbar_home_link.innerText = 'Logout';
	navbar_home_link.id = 'Logout_Tab';

	let navbar_dashboard = document.createElement('button');
	navbar_dashboard.className = 'nav-link';
	navbar_dashboard.setAttribute('onclick','switchToDash()');
	navbar_dashboard.setAttribute('style', 'text-decoration:none !important;border:none;cursor:pointer;width:150px;height:55px;background-color:#f8f9fa;color:inherit;');
	navbar_dashboard.innerText = 'Dashboard';
	navbar_dashboard.id = 'Dashboard_Tab';

	let navbar_Uni_creation = document.createElement('button');
	navbar_Uni_creation.className = 'nav-link';
	navbar_Uni_creation.setAttribute('onclick','switchToUniCreation()');
	navbar_Uni_creation.setAttribute('style', 'text-decoration:none !important;border:none;cursor:pointer;width:150px;height:55px;background-color:#f8f9fa;color:inherit;');
	navbar_Uni_creation.innerText = 'University Creation';
	navbar_Uni_creation.id = 'University_Creation_Tab';

	let navbar_Event_creation = document.createElement('button');
	navbar_Event_creation.className = 'nav-link';
	navbar_Event_creation.setAttribute('onclick','switchToEC()');
	navbar_Event_creation.setAttribute('style', 'text-decoration:none !important;border:none;cursor:pointer;width:150px;height:55px;background-color:#f8f9fa;color:inherit;');
	navbar_Event_creation.innerText = 'Event Creation';
	navbar_Event_creation.id = 'Event_Creation_Tab';

	col1.appendChild(navbar_brand);
	col2.appendChild(navbar_home_link);
	col3.appendChild(navbar_dashboard);
	col4.appendChild(navbar_Uni_creation);
	col5.appendChild(navbar_Event_creation);
	row.appendChild(col1);
	row.appendChild(col2);	
	row.appendChild(col3);
	row.appendChild(col4);
	row.appendChild(col5);
	navBar.appendChild(row);
	navBarContainer.appendChild(navBar);
}
//var info = ['UCF'];
function initListOfApprovals()
{
    cardContainer = document.getElementById('card-container');
    		for(var i=0;i<5;i++)
    		{
    			let x = new Information(info[i],i);
    			createApprovalCard(x);
        	}
};

function myEvents(userType)
{
	let cardContainer;

    cardContainer = document.getElementById('card-container_MyEvents');
    		for(var i=0;i<5;i++)
    		{
    			//let x = new Information(info[i],i,i);
    			createEventCard(window.eventSearch[i],cardContainer);
        	}
};

function eventSearch()
{
	doEventSearch();
	let cardContainer;
	console.log("event search function is reached");

    cardContainer = document.getElementById('card-container');
    		for(var i=0;i<window.eventArray.length;i++)
    		{
    			//let x = new Information(info[i],i,i);
    			createEventCard(window.eventArray[i],cardContainer);
        	}
}