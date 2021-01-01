// ToDo: Weckeransichten von vorne/von hinten sollen nicht
// gleichzeitig sichtbar sein!

// Wecker auf Nachttisch
var wecker = document.getElementById("wecker");
var abstimmungszettel = document.getElementById("abstimmungszettel");

// Rand von Wecker gross von vorne
var wecker_rand = document.getElementById("wecker_rand");
var aufziehen = document.getElementById("aufziehen");
// Ziffernblatt
var clockbox = document.getElementById("clockbox");
var clock = document.getElementById("clock");
var wecker_vorne = document.getElementById("wecker_vorne");
var wecker_hinten = document.getElementById("wecker_hinten");
var aufziehschluessel2 = document.getElementById("aufziehschluessel2");
var aufziehschluessel = document.getElementById("aufziehschluessel");

const secDiv = document.getElementById('second');
const minDiv = document.getElementById('minute');
const hourDiv = document.getElementById('hour');
const timerDiv = document.getElementById('timer');

var centerX=850;
var centerY=450;
var ansicht=1;
var selectedElement=false;


// Wenn der Wecker geklickt wird, wird diese Funktion aufgerufen
// Sie bewirkt, dass der Wecker in gross angezeigt wird

function getCookie(cname) {
  var test = cname + "=";
 
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(test) == 0) {
      return c.substring(test.length, c.length);
    }
  }
  return "";
}
function moveAufziehschluessel(event) {
  
  var windowMarginLeft = (window.innerWidth - 1200)/2;
  aufziehschluessel.style.left = event.clientX - windowMarginLeft + 'px';
  aufziehschluessel.style.top = event.clientY-50 + 'px';
  
}

function callAufziehschluessel() {
	
  wecker_hinten.addEventListener("mousemove", moveAufziehschluessel);
  // Wenn mit der Fahne auf das Hintergrundbild geklickt wird:
  // Koordinaten prüfen
  //document.addEventListener("click", putFlag);
  aufziehschluessel.classList.toggle("display");
  
  // Übergangslösung
  //button_removeFlag.addEventListener("click", stopFlag);
}
function showClock() {
  clockbox.classList.toggle("display");
  wecker_vorne.classList.toggle("display");
  
}
function weckerAufziehen() {
	window.alert("Wecker aufgezogen");
	document.cookie="aufziehen=done";
	updateSeconds();
	setInterval(updateSeconds, 1000);
}
function turnClock() {
  // Wecker (Ansicht von vorne) verstecken
  if (ansicht==0){
	ansicht=1;
		  
  } 
  else {
	ansicht=0;
	var aufziehschluessel  = getCookie("aufziehschluessel");
    
	if (aufziehschluessel != "") {
	callAufziehschluessel();
	aufziehen.addEventListener("click", weckerAufziehen);
	
    } 
  }
	
  
  clockbox.classList.toggle("display");
  wecker_vorne.classList.toggle("display");
  wecker_hinten.classList.toggle("display");
}

function openPuzzle() {
		location.assign("abstimmungszettel.html");
}


function updateClock(){
	let date = new Date();
	let sec = date.getSeconds() / 60;
	let min = (date.getMinutes() + sec) / 60;
	let hour = (date.getHours() + min) / 12;

	secDiv.style.transform = "rotate(" + (sec * 360) + "deg)";
	minDiv.style.transform = "rotate(185deg)";
	hourDiv.style.transform = "rotate(75deg)";
	timerDiv.style.transform = "rotate(210deg)";
	
}
function updateSeconds(){
	let date = new Date();
	let sec = date.getSeconds() / 60;
	let min = (date.getMinutes() + sec) / 60;
	let hour = (date.getHours() + min) / 12;

	secDiv.style.transform = "rotate(" + (sec * 360) + "deg)";
	
}

function checkTimer(){
	var checkTimerArm=timerDiv.style.transform;
	checkTimerArm=checkTimerArm.replace("rotate(","");
	checkTimerArm=checkTimerArm.replace("deg)","");
	var checkHourArm=hourDiv.style.transform
	checkHourArm=checkHourArm.replace("rotate(","");
	checkHourArm=checkHourArm.replace("deg)","");
	var TestArm=Math.abs(checkHourArm-checkTimerArm)
	console.log(TestArm);
	
	if(TestArm < 5){
		window.alert("Rrrrring");
		
	}
	
}

function drop(ev) {
	
	var punktX=ev.clientX;
	var punktY=ev.clientY;
	
	if (punktX>centerX){
		gegenkathete=punktX-centerX;
	} else {
		gegenkathete=centerX-punktX;
	}
	
	if (punktY>centerY){
		ankathete=punktY-centerY;
	} else {
		ankathete=centerY-punktY;
	}
	
	hypotenuse=Math.sqrt(Math.pow(ankathete, 2)+(Math.pow(gegenkathete, 2)));
	
	radian=Math.asin(gegenkathete/hypotenuse);
	winkel=radian*(180/Math.PI)
	
	
	
	var testX = Math.sign(centerX-punktX);
	
	var testY = Math.sign(centerY-punktY);
	
	
		
	if (testX==1) {
		if (testY==-1){
			winkel=180+winkel;
			
			selectedElement.style.transform = "rotate("+winkel+"deg)";
			
		} if (testY==1) {
			
			winkel=360-winkel;
			
			selectedElement.style.transform = "rotate("+winkel+"deg)";
		}
		
	}
	
	if (testX==-1) {
		if (testY==-1){
			Hwinkel=90-winkel;
			Kwinkel=90+Hwinkel;
			
			selectedElement.style.transform = "rotate("+Kwinkel+"deg)";
			
		} if (testY==1){
			
			
			selectedElement.style.transform = "rotate("+winkel+"deg)";
		}
		
	}
	
	
}
function dropEnd(evt){
	drop(evt);
	clock.removeEventListener('mousemove',drop)
	var aufziehenCookie  = getCookie("aufziehen");
    
	if (aufziehenCookie != "") {
		console.log(aufziehenCookie);
		checkTimer();
	}
}

function startDrag(evt) {
      
	  selectedElement = evt.target;
	  console.log(selectedElement);
	  console.log(selectedElement.classList[0]);
	  if (selectedElement.classList[0]=="timer-arm"){
		  selectedElement=timerDiv;
		  
	  }else {
		  selectedElement=hourDiv;
	  }
	  
	  clock.addEventListener('mousemove', drop);
	  clock.addEventListener('mouseup', dropEnd);
    }

function findKey() {
	document.cookie="aufziehschluessel=done";
	window.alert ("Aufziehschlüssel gefunden");
	
}

function setup() {
  wecker.addEventListener("click", showClock);
  wecker_rand.addEventListener("click", turnClock);
  abstimmungszettel.addEventListener("click", openPuzzle);
  aufziehschluessel2.addEventListener("click", findKey);
  hourDiv.addEventListener("mousedown",startDrag);
  timerDiv.addEventListener("mousedown",startDrag);
  updateClock();
   }

window.addEventListener("load", setup);


// Diese Funktion vergleicht den im Placeholder-Rätsel-Formular eingegebenen
// Wert (solution1) mit dem Lösungswort
// function checkPuzzle1() {
  // var solution1 = document.forms["puzzle1"]["solution1"].value;
  // if (solution1 == "1937") {
  //   window.alert("Glückwunsch! Diese Antwort ist richtig!");
  // }
// }
