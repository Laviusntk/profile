function expandForm(){
    $("#openSignUpForm").click(function(){
    	$("#login").fadeOut("slow"),
    	$("#signUp").fadeIn("slow"),
    	initiate();
    });
    $("#closeSignUpForm").click(function(){
    	$("#signUp").fadeOut("slow"),
    	$("#login").fadeIn("slow");
    });
    $("input[type=text]").click(
    	function(){
    		this.style.color = "#778",
    		this.value = "";
    	}
    );  
    $("input[type=email]").click(
    	function(){
    		this.style.color = "#778",
    		this.value = "";
    	}
    ); 
    $("input[type=password]").click(
    	function(){
    		this.style.color = "#778",
    		this.value = "";
    	}
    );           
}

function User(arg_forename, arg_username, arg_password){
	forename = arg_forename
	username = arg_username
	password = arg_password
	
	this.showUser = function(){
		document.write("<p>Forename: " + forename + "</p>")
		document.write("<p>Username: " + username + "</p>")
		document.write("<p>Password: " + password + "</p>")
	}
}


function envoke(){
	alert("Hi");
	var details = new User("Wolfgang", "w.a.mozart", 758);
	details.showUser();
}

function validateForename(field){
	var message = "";
	if (field == ""){ 
		document.getElementById("signUpForm").forename.value = "No Forename was entered";
		 message = "No Forename was entered";
	}
	return message;	
}

function validateSurname(field) {
	var message = "";
	if (field == ""){ 
		document.getElementById("signUpForm").surname.value = "No Surname was entered";
		 message = "No Surname was entered";
	}
	return message;	 
}

function validateUsername(field){
	var message = "";
	if (field == "")
		message = "No Username was entered.\n"
	else if (field.length < 5)
		message = "Usernames must be at least 5 characters.\n"
	else if (/[^a-zA-Z0-9_-]/.test(field))
		message = "Only a-z, A-Z, 0-9, - and _ allowed in Usernames.\n"
	if(message != "")
		document.getElementById("signUpForm").username.value = message;
	return message;
}

function validatePassword(field1,field2) {
	var message = "";
	if( field1 != field2)
		message = "Passwords Do Not Match";
	else if (field1 == "" || field2 == "") 
		message = "No Password was entered.\n"
	else if (field1.length < 6 || field1.length < 6)
		message = "Passwords must be at least 6 characters.\n"
	else if (!/[a-z]/.test(field1) || ! /[A-Z]/.test(field1) || !/[0-9]/.test(field1))
		message = "Passwords require one each of a-z, A-Z and 0-9.\n"
	if(message != "")
		alert(message);
	return message;
}

function validateAge(field) {
	var message = ""
	if (isNaN(field)) 
		message = "No Age was entered.\n"
	else if (field < 18 || field > 110){
		message = "Age must be between 18 and 110.\n"
	}
	if(message != "")
		document.getElementById("signUpForm").age.value = message;
	return message;
}

function validateEmail(field) {
	var message = ""
	if (field == "") 
		message = "No Email was entered.\n"
	if (!((field.indexOf(".") > 0) && (field.indexOf("@") > 0)) || /[^a-zA-Z0-9.@_-]/.test(field))
		message = "The Email address is invalid.\n"
	if(message != "")
		document.getElementById("signUpForm").email.value = message;
	return message;
}

function validate(form){
	alert("ALL DONE : "+makeRED());
}

function initiate(){
	var x = document.getElementById("signUpForm");
	x.schoolName.vlaue = "UWC";
	x.surname.value = "Motileng";
	x.email.value = "laviusntk@gmail.com";
	x.age.value = 23;
	x.username.value = "laviusntk";
	x.password1.value = "123qweASD";
	x.password2.value = "123qweASD";
}


function makeRED(){
	var OK = true;
	var x = document.getElementById("signUpForm");
	
	if( validateForename(x.forename.value) != ""){
		x.forename.style.color = "red";
		OK = false;
	}	
		
	if( validateUsername(x.username.value) != ""){
		x.username.style.color = "red";
		OK = false;
	}		

	if( validateSurname(x.surname.value) != ""){
		x.surname.style.color = "red";
		OK = false;
	}	
		
	if( validateEmail(x.email.value) != ""){
		x.email.style.color = "red";
		OK = false;
	}
		
	if( validateAge(x.age.value) != ""){
		x.age.style.color = "red";
		OK = false;
	}
		
	if( validatePassword(x.password1.value,x.password2.value) != ""){
		x.password1.style.color = "red";
		x.password2.style.color = "red";
		OK = false;
	}
	
	return OK;		
}



/*
// retrieve the element
element = document.getElementById("logo");

// reset the transition by...
element.addEventListener("click", function(e){
  e.preventDefault;
  
  // -> removing the class
  element.classList.remove("run-animation");
  
  // -> triggering reflow  //The actual magic 
  // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
  element.offsetWidth = element.offsetWidth;
  
  // -> and re-adding the class
  element.classList.add("run-animation");
}, false);
*/
