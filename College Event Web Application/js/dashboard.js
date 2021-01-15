function Information(event_name, update_time)
{
	this.event_name = event_name;
	this.update_time = update_time;
}

let cardContainer;
let navBarContainer;
var userType = 3;
var info = ['UCF'];
var university_names = [];
var locations = [];

function createTaskCard(task){

    let card = document.createElement('a');
    card.className = 'card';
    card.setAttribute('href', '#');
    card.setAttribute('style', 'height:6rem;margin-left:10px;text-decoration:none !important;color:inherit;border:1px solid #0f2862;')

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let event_name = document.createElement('h5');
    let event_name_icon = document.createElement('i');
    event_name.innerText = task.event_name;
    event_name.className = 'card-event_name';

    let update_time = document.createElement('div');
    update_time.innerText = task.update_time;
    update_time.className = 'card-update_time';

    cardBody.appendChild(event_name);
    cardBody.appendChild(update_time);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

}

function createNavStudent()
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
	let navbar_brand = document.createElement('a');
	navbar_brand.className = 'navbar-brand';
	navbar_brand.setAttribute('href','index.html');
	navbar_brand.setAttribute('style','text-decoration:none !important;color:inherit;');
	navbar_brand.innerText = 'Event Tracker';
	let navbar_home_link = document.createElement('a');
	navbar_home_link.className = 'nav-link';
	navbar_home_link.setAttribute('href', 'index.html');
	navbar_home_link.setAttribute('style', 'text-decoration:none !important;color:inherit;');
	navbar_home_link.innerText = 'Home';
	let navbar_dashboard = document.createElement('a');
	navbar_dashboard.className = 'nav-link';
	navbar_dashboard.setAttribute('href','file:///C:/Users/flgat/OneDrive/Desktop/COP_4710/College_Event_Webapp/dashboard.html');
	navbar_dashboard.setAttribute('style', 'text-decoration:none !important;color:inherit;');
	navbar_dashboard.innerText = 'Dashboard';

	col1.appendChild(navbar_brand);
	col2.appendChild(navbar_home_link);
	col3.appendChild(navbar_dashboard);
	row.appendChild(col1);
	row.appendChild(col2);	
	row.appendChild(col3);
	navBar.appendChild(row);
	navBarContainer.appendChild(navBar);
}

function createNavAdmin()
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
	navbar_brand.setAttribute('href','file:///C:/Users/flgat/OneDrive/Desktop/COP_4710/College_Event_Webapp/main.html');
	navbar_brand.setAttribute('style','text-decoration:none !important;color:inherit;');
	navbar_brand.innerText = 'Event Tracker';
	let navbar_home_link = document.createElement('a');
	navbar_home_link.className = 'nav-link';
	navbar_home_link.setAttribute('href', 'file:///C:/Users/flgat/OneDrive/Desktop/COP_4710/College_Event_Webapp/main.html');
	navbar_home_link.setAttribute('style', 'text-decoration:none !important;color:inherit;');
	navbar_home_link.innerText = 'Home';
	let navbar_dashboard = document.createElement('a');
	navbar_dashboard.className = 'nav-link';
	navbar_dashboard.setAttribute('href','file:///C:/Users/flgat/OneDrive/Desktop/COP_4710/College_Event_Webapp/dashboard.html');
	navbar_dashboard.setAttribute('style', 'text-decoration:none !important;color:inherit;');
	navbar_dashboard.innerText = 'Dashboard';
	let navbar_event_creation = document.createElement('a');
	navbar_event_creation.className = 'nav-link';
	navbar_event_creation.setAttribute('href','file:///C:/Users/flgat/OneDrive/Desktop/COP_4710/College_Event_Webapp/event_creation.html#');
	navbar_event_creation.setAttribute('style', 'text-decoration:none !important;color:inherit;');
	navbar_event_creation.innerText = 'Event Creation';

	col1.appendChild(navbar_brand);
	col2.appendChild(navbar_home_link);
	col3.appendChild(navbar_dashboard);
	col4.appendChild(navbar_event_creation);
	row.appendChild(col1);
	row.appendChild(col2);	
	row.appendChild(col3);
	row.appendChild(col4);
	navBar.appendChild(row);
	navBarContainer.appendChild(navBar);
}

function createNavSuperAdmin()
{

}

function createNavHome()
{

}

function makeVisible()
{

}

function makeDisappear()
{
	
}

function initListOfTasks()
{
  navBarContainer = document.getElementById('navbar');
  //console.log(userType);
  if(navBarContainer == null)
  {
  	return;
  }
  if(userType == 2)
  {
  	createNavAdmin();
  }
  if(userType == 3)
  {
 	 createNavStudent();
  }

    cardContainer = document.getElementById('card-container');
    		for(var i=0;i<5;i++)
    		{
    			let x = new Information(info[i],i);
    			createTaskCard(x);
        	}
};

initListOfTasks();

//var apifolder = 'php/'
//var extension = 'php';

/*function doLogin()
{
	userId = 0;
	userType = 0;					//will have usertype value returned from database
	firstName = "";					//user first name loaded from database
	lastName = "";					//user last name loaded from database
	sessionID = 0;					//session id
	events = [];					//array of events the user is going to attend

	//obtaining the username from login form
	username = document.getElementByID('userName').value;
	//obtaining the password form login form
	password = document.getElementByID('password').value;

	if(username.length == 0 || password.length == 0)
	{
		document.getElementById("loginresult").innerHTML = "One or more fields are incorrect";
		return;
	}

	if(regexCheck(username, /\W/))
	{
		document.getElementById("loginresult").innerHTML = "Username can only consist of alpha,numberical, or _ characters";
		return;
	}

	//create a hashed password

	sessionID = Math.random().toString(36).substr(2,10);

	var jsonPayload = '{'
		+ '"username":"'	+username + '", '
		+ '"password":"'	+password + '",'
		+ '"sessionID":"'	+sessionID
		+ '"}';

	var url = apifolder + 'Login.'+extension;

	var xhr = new XMLHttpRequest();

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4)
		{
			if(this.status == 200)
			{
				var jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;
			}
		}
	}
}*/
