var user;
var  done = false;
var  userAnswerIndex = 1;
function User(name,challengeType){
	this.username = name;
	this.score = 0;
	this.status = "pending..."
	this.grade = 0.0;
	this.level = 1;
	this.challenge = challengeType;
	this.AnswersArray = [0.0];
	this.ProblemSetArray = [];
	this.UserReport = [];
	this.UsersAnswersArray = [];
	this.AnswersArrayIndex = 0;
	this.UsersAnswersArrayIndex = 0;	
	this.time = 20;
	this.next = false;
	this.problemNumber = 0;
	this.term = 0;
	this.canvasBox = document.getElementById("userDetails");
        this.canvasBox2 = document.getElementById("userDetails2");
	this.challengesBox = document.getElementById("challenges");	
	
	
	this.showUser = function(){
                if( screen.width > 650){
		    this.canvasBox.innerHTML = "<pre>Name   :<a> "+this.username+"</a><br></pre>";
		    this.canvasBox.innerHTML += "<pre>Score  :<a> "+this.score+" / "+(this.level*5)+"</a><br></pre>";
		    this.canvasBox.innerHTML += "<pre>Status :<a> "+this.status+"</a><br></pre>";
		    this.canvasBox.innerHTML += "<pre>Grade  :<a> "+this.grade+"%</a><br></pre>";
		    this.canvasBox.innerHTML += "<pre>Level  :<a> "+this.level+" ("+this.challenge+")</a><br></pre>";
               }
               else{
		    this.canvasBox2.innerHTML = "<pre>Name   :<a> "+this.username+"</a><br></pre>";
		    this.canvasBox2.innerHTML += "<pre>Score  :<a> "+this.score+" / "+(this.level*5)+"</a><br></pre>";
		    this.canvasBox2.innerHTML += "<pre>Status :<a> "+this.status+"</a><br></pre>";
		    this.canvasBox2.innerHTML += "<pre>Grade  :<a> "+this.grade+"%</a><br></pre>";
		    this.canvasBox2.innerHTML += "<pre>Level  :<a> "+this.level+" ("+this.challenge+")</a><br></pre>";
               }
	}
	this.setLevel = function(x){
		this.level = x;
		this.showUser();
	}
	
     this.DisplayProblemSet = function(){
     	this.term++;
		var r = Math.floor( Math.random() * this.level * 5);
		var r2 = Math.floor( Math.random() * this.level * 5);
		var operator = storeAnswers(this.AnswersArray, this.AnswersArrayIndex, r, r2, this.challenge);			
		this.challengesBox.innerHTML = r + operator + r2 +" = ";
		this.ProblemSetArray[this.AnswersArrayIndex] = r + operator + r2 +" = ";
		this.AnswersArrayIndex++;
		this.problemNumber++;
	}
	
	this.LevelComplete = function(){
		var text ="<table><th>Problem </th><th> Solution</th>"
                 if(screen.width > 650)
                       text += "<th>Your Answer</th>";
		for(i = 0; i < this.level * 5; i++){
			text  += "<tr>";
			text  += "<td>"+this.ProblemSetArray[i]+"</td>";
			text  += "<td>"+this.AnswersArray[i]+"</td>";
                         if(screen.width > 650)
			            text  += "<td>"+this.UsersAnswersArray[i + 1]+"</td>";
			text  += "</tr>";
			
			if(this.AnswersArray[i] == this.UsersAnswersArray[i + 1])
				this.score++;
		}
		
		this.challengesBox.innerHTML = text + "</table>";
		document.getElementById("newsearch").userAnswer.value = this.score;
		var factor = 100 / (this.level * 5);
		this.grade = this.score * factor;
		if( this.grade >= 90 )
			this.status = "A+";
		else if(this.grade >= 80)
			this.status = "A";
		else if(this.grade >= 70)
			this.status = "B";
		else if(this.grade >= 60)
			this.status = "C";
		else if( this.grade < 60)
			this.status = "fail";
		this.showUser();
	}
	
	this.tester = function(){
		alert("check COMPLETE");
	}	
	
	this.ProblemGenerator = function(level){
		this.setLevel(level);
		timer();
	}
	
	this.initiate = function(i){		
		//alert("Inside initiate this.level * 5 is : "+ i * 5);
		this.showUser();
		for(J = 0;J < i * 5 ; J++){
			this.AnswersArray[J] = J;
			this.ProblemSetArray[J] = "[****] "+J;
			this.UsersAnswersArray[J+1] = J * 11;		
		}
		this.ProblemGenerator(i);
		this.showUser();
	}
	
	/*this.reset(){
		this.username = name;
		this.score = 0;
		this.status = "pending..."
		this.grade = 0.0;
		this.level++;
		this.challenge = challengeType;		
		this.AnswersArray = [];
		this.ProblemSetArray = [];
		this.UserReport = [];
		this.AnswersArrayIndex = 0;
		this.UsersAnswersArray = [];
		this.UsersAnswersArrayIndex = 0;	
		this.time = 20;
		this.next = false;
		this.problemNumber = 0;
		this.term = 0;	
	}*/
}

function storeAnswers(X, i, variable1, variable2, challengeType){
	var Operator = " + ";
	if(challengeType == "Addition")
		X[i] = variable1 + variable2
		
	else if(challengeType == "Subtraction"){
		X[i] = variable1 - variable2;
		Operator = " - "
	}
	
	else if(challengeType == "Multiplication"){
		X[i] = variable1 * variable2;
		Operator = " x "
	}	
	else{
		X[i] = variable1 / variable2;
		Operator = " / "
	}	
	return Operator;
}

function Driver(){
        document.getElementById("DesktopTimer").innerHTML = "hello";
		scoreBox();
}

function timer(){
		var time = 20;
		alert(user.level * 1500);
		handle = setInterval(function(){
			if(user.term != user.level * 5){
		              document.getElementById("DesktopTimer").innerHTML = time;
                      document.getElementById("timer2").innerHTML = time;
				time--;
				if( time == 0 ){
					time = 20;
					storeUserAnswer();
					clearInterval(handle);
					user.LevelComplete();						
				}
			}
		},user.level * 1500);
}
/*
function timer(){
		var time = 20;
		handle = setInterval(function(){
			if(user.term != user.level * 5){
				document.getElementById("timer").innerHTML = time;
				time--;
				if( time == 0){
					time = 20;
					storeUserAnswer();
					user.DisplayProblemSet();	
				}
				if(user.term == user.level * 5 + 1){
					user.next = false;
					clearInterval(handle);
					user.LevelComplete();
				}
				else if(user.next){
					user.next = false;
					clearInterval(handle);			
				}
			}
		},300);
}
*/

function nextChallenge(){
	storeUserAnswer();
	if(user.term != user.level * 5 + 1)
		user.DisplayProblemSet();
	else{
		user.LevelComplete();
		clearInterval(handle);
		document.getElementById("DesktopTimer").innerHTML = "DONE";
        document.getElementById("timer2").innerHTML = "DONE";
	}
	/*if(user.term > 0){
		if(user.term != user.level * 5 + 1){
			storeUserAnswer();
			user.DisplayProblemSet();
		}
		else if(user.term == user.level * 5 + 1){
			//clearInterval(handle);
			alert("GOT HERE");
			document.getElementById("timer").innerHTML = 0;
			user.LevelComplete();
		}
		else{
			user.level++;
			uer.score = 0;
			user.term = 0;
			timer();		
		}
	}
	else{
		user.DisplayProblemSet();
	}*/
}

function storeUserAnswer(){
	var x = document.getElementById("newsearch");
	var text = x.userAnswer.value;
	user.UsersAnswersArray[userAnswerIndex] = text;
	//alert(user.UsersAnswersArray[userAnswerIndex]);
	userAnswerIndex++;
	var text = x.userAnswer.value = 0;		
}

function storeUserName(){
	var x = document.getElementById("newsearch");
	var text = x.userNameHandle.value;
	var UserOp = x.userOption.value;
	var userLOp = x.userLevelOption.value;
	user = new User(text,UserOp);
	document.getElementById("newsearch").userAnswer.style.visibility = "visible";
	user.initiate(userLOp);
	if(user.term == 0){
		document.getElementById("next").style.visibility = "visible";
		user.DisplayProblemSet();
	}	
}
function Loading(){
element = document.getElementById("logo");
	element.addEventListener("click", function(e){
		e.preventDefault;
		element.classList.remove("run-animation");
		element.offsetWidth = element.offsetWidth;
		element.classList.add("run-animation");
	}, false);	
}

function scoreBox(){
    var c = document.getElementById("draw");
    var pen = c.getContext("2d");
    pen.font = "30px Arial";
    pen.fillStyle = "#0095cd";
    pen.strokeStyle = "rgba(255,255,255,0.5)";
    pen.moveTo(0,0);
    pen.lineTo(0,50);
    pen.lineTo(200,50);
    pen.lineTo(200,0);

    pen.fill();
    pen.fillStyle = "#ffffff";

	var term = 2;
        pen.moveTo(70,50);
        pen.lineTo(100,65);

        pen.lineTo(130,50);
        pen.lineTo(70,50);
        pen.stroke();
 
        pen.fillStyle = "#0095cd";

        //pen.fillStyle = "#cf12ee";
        pen.fill();
      
        pen.fillStyle = "#ffffff";
        pen.fillText("Time Left",30,35);      
        term = term + 1; 
}

function viewTutorial(){
	if( screen.width < 650)
	document.getElementById("challenges").innerHTML = "<br><iframe width='250' height='315' src='https://www.youtube.com/embed/05RKB-yPR2A' frameborder='0' allowfullscreen></iframe>" +document.getElementById("challenges").innerHTML;
	else{
	document.getElementById("challenges").innerHTML = "<br><iframe width='500' height='415' src='https://www.youtube.com/embed/05RKB-yPR2A' frameborder='0' allowfullscreen></iframe>" +document.getElementById("challenges").innerHTML;
	}
}

