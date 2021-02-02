// ToDo: Weckeransichten von vorne/von hinten sollen nicht
// gleichzeitig sichtbar sein!
var hintergrund=document.getElementById("hintergrund");
// Wecker auf Nachttisch
var wecker = document.getElementById("wecker");

// Abstimmungszettel
var abstimmungszettel = document.getElementById("abstimmungszettel");

//Kalender
var kalenderblatt = document.getElementById("kalenderblatt")
var kalendertest= 0
// Licht an
var nacht= document.getElementById("nacht");
var schalter = document.getElementById("schalter");
// Rand von Wecker gross von vorne
var wecker_rand = document.getElementById("wecker_rand");
var aufziehen = document.getElementById("aufziehen");
// Ziffernblatt
var clockbox = document.getElementById("clockbox");
var clock = document.getElementById("clock");
var wecker_vorne = document.getElementById("wecker_vorne");
var wecker_hinten = document.getElementById("wecker_hinten");
var spinner = document.getElementById("spinner");
var aufziehschluessel3 = document.getElementById("aufziehschluessel3");
var aufziehschluessel = document.getElementById("aufziehschluessel");
var weckerdrehen =document.getElementById("weckerdrehen");


var weissesFeld=document.getElementById("weissesFeld");

//Variablen für Zeiger, Uhrfunktionen
const secDiv = document.getElementById('second');
const minDiv = document.getElementById('minute');
const hourDiv = document.getElementById('hour');
const timerDiv = document.getElementById('timer');

var centerX=783;
var centerY=446;
var ansicht=1;
var ansicht2=1;
var selectedElement=false;

//Variablen für Zahlenrad
var NUM_HEIGHT = 30;
var Y_OFFSET = 25;
var SPINNER_HEIGHT = 75;

var targetPosition = new Array (0,0,0,0,0,0,0,0,0);
var currentPosition = new Array (0,0,0,0,0,0,0,0,0);
var deltaY = new Array (0,0,0,0,0,0,0,0,0);
var rad="number1";
var speicher=new Array (0,0,0,0,0,0,0,0,0);
var loesung=new Array (0,0,7,0,2,1,9,7,1);
var zahl = 0

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
  aufziehschluessel.style.left = event.clientX - windowMarginLeft -40 + 'px';
  aufziehschluessel.style.top = event.clientY-90 + 'px';

}

function callAufziehschluessel() {
  aufziehschluessel.style.width="68px";
  document.addEventListener("mousemove", moveAufziehschluessel);
   //console.log("H");
}

//Uhr anzeigen
function showClock() {
	if (ansicht==1){
		ansicht=0
		hintergrund.addEventListener("click",showClock);
	}else{
		hintergrund.removeEventListener("click",showClock);
		ansicht=1
	}

   if (ansicht2==1){
       clockbox.classList.toggle("display");
       wecker_vorne.classList.toggle("display");
       weckerdrehen.classList.toggle("display");

	}else{
		wecker_hinten.classList.toggle("display");
		spinner.classList.toggle("display");

	}
	if (ansicht2==0){
	var aufziehschluesselCookie  = getCookie("aufziehschluessel");
	var aufziehenCookie = getCookie("aufziehen");

    //console.log(aufziehschluesselCookie);
	//console.log(aufziehenCookie);
	if (aufziehschluesselCookie != "" && aufziehenCookie=="") {
	aufziehschluessel.classList.toggle("display");
	callAufziehschluessel();
	aufziehen.classList.toggle("display");
	aufziehen.addEventListener("click", weckerAufziehen);

    }
	}



}

function weckerAufziehen() {
	document.getElementById('AV-weckeraufziehen').play();
	aufziehschluessel.classList.toggle("display");
	document.cookie="aufziehen=done";
	updateSeconds();
	setInterval(updateSeconds, 1000);
	document.getElementById("AV-weckeraufziehen").addEventListener('ended', function(){

    document.getElementById("AV-ticken").play();
	document.getElementById("AV-ticken").loop = true;
  });

}
function turnClock() {

	if (ansicht2==1){
	var aufziehschluesselCookie  = getCookie("aufziehschluessel");
	var aufziehenCookie = getCookie("aufziehen");

    //console.log(aufziehschluesselCookie);
	//console.log(aufziehenCookie);
	if (aufziehschluesselCookie != "" && aufziehenCookie=="") {
	aufziehschluessel.classList.toggle("display");
	callAufziehschluessel();
	aufziehen.classList.toggle("display");
	aufziehen.addEventListener("click", weckerAufziehen);

    } ansicht2=0;
	} else{
	var aufziehschluesselCookie  = getCookie("aufziehschluessel");
	var aufziehenCookie = getCookie("aufziehen");

    //console.log(aufziehschluesselCookie);
	//console.log(aufziehenCookie);
	if (aufziehschluesselCookie != "" && aufziehenCookie=="") {
	aufziehschluessel.classList.toggle("display");
	callAufziehschluessel();
	aufziehen.classList.toggle("display");
	aufziehen.addEventListener("click", weckerAufziehen);
	}
	ansicht2=1;
	}

  // Wecker (Ansicht von vorne) verstecken
  //console.log(ansicht2);
  clockbox.classList.toggle("display");
  wecker_vorne.classList.toggle("display");
  wecker_hinten.classList.toggle("display");
  spinner.classList.toggle("display");
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


	if(TestArm < 5){
		//console.log("Done");
		document.getElementById('AV-ticken').pause();
		document.getElementById('AV-klingeln').play();
		document.getElementById('AV-klingeln').addEventListener("ended", function () {
			location.assign("wecker_3.html");
		});
		document.cookie="aufziehen=";
		document.cookie="abstimmungszettelB=";
		document.cookie="schieberaetsel=";
		document.cookie="aufziehschluessel=";
		document.cookie="zahlencode=";
		document.cookie="kalender=";
		document.cookie="aufziehenCookie=";

	}

}

function drop(ev) {

	var punktX=ev.clientX;
	var punktY=ev.clientY;

	 //console.log(punktX);
	 //console.log(punktY);

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
	var zahlencodeCookie = getCookie("zahlencode");
	var schieberaetselCookie=getCookie("schieberaetsel");
	var kalenderCookie= getCookie("kalender");

	if (aufziehenCookie != "" && zahlencodeCookie!="" && kalenderCookie!="" && schieberaetselCookie!="") {
		//console.log(aufziehenCookie);
		checkTimer();
	}
}

function startDrag(evt) {

	  selectedElement = evt.target;
	  //console.log(selectedElement);
	  //console.log(selectedElement.classList[0]);
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
	//window.alert ("Aufziehschlüssel gefunden");
	aufziehschluessel3.classList.toggle("hide");
	aufziehschluessel.classList.toggle("display");
	hintergrund.style.opacity="0.2";
	kalenderblatt.style.opacity="0.2";
	aufziehschluessel.style.width="150px";
	window.setTimeout(function (){
		aufziehschluessel.classList.toggle("display");
		hintergrund.style.opacity="1";
		kalenderblatt.style.opacity="1";
	}, 1000);
	
	//document.cookie="aufziehschluessel=";

}

function lichtAn (){
  document.getElementById('AV-schalter').play();
  //document.getElementById('AV-schalter').addEventListener('ended', function(){
	  //nacht.classList.toggle("hide");
	  //schalter.classList.toggle("hide");
  //});
	setTimeout(function() {
    nacht.classList.toggle("hide");
	 schalter.classList.toggle("hide");
     }, 500);
}

//Funktionen für Zahlenrad
function pruefen(){


    for (var i = 0, len = speicher.length; i < len; i++){
     if (speicher[i] !== loesung[i]){
      return false;
     }
    }
    return true;
}

function targetReached() {

  deltaY[zahl] = 0;
  currentPosition[zahl] = targetPosition[zahl];
  speicher[zahl]=currentPosition[zahl];

  //document.getElementById("value").innerHTML = "Value: " + currentPosition[zahl];
  pruefen();
  if (pruefen()==true){
	  document.getElementById('AV-schalter').play();
	  document.cookie="zahlencode=done";


  }
}

function move() {

  var yPosition = -currentPosition[zahl] * NUM_HEIGHT + deltaY[zahl] + Y_OFFSET;


  document.getElementById(rad).style.backgroundPosition = "0px " + yPosition + "px";

  if (targetPosition[zahl] > currentPosition[zahl]) {
    if (deltaY[zahl]  > -NUM_HEIGHT) {
      deltaY[zahl]  = deltaY[zahl]  - 5;
      setTimeout(move, 10);


    } else {
      targetReached();
    }
  } else if (targetPosition[zahl] < currentPosition[zahl]) {
    if (deltaY[zahl]  < NUM_HEIGHT) {
      deltaY[zahl]  = deltaY[zahl]  + 5;
      setTimeout(move, 10);
    } else {

      targetReached();

    }
  }

}

function getClickPosition(e) {
	var kalenderCookie= getCookie("kalender");
  // Click position handling.
  // xPosition and yPosition are relative to element bounds.
  // Source: http://www.kirupa.com/html5/getting_mouse_click_position.htm
  if (kalenderCookie != ""){
  rad=e.currentTarget.id;
  zahl =rad.replace("number","")
  document.getElementById('AV-zahlenrad').play();



  var parentPosition = getPosition(e.currentTarget);
  //console.log(e.clientY);
  //console.log(parentPosition.y);
  var xPosition = e.clientX - parentPosition.x;
  var yPosition = Math.abs(e.clientY - parentPosition.y);
  //console.log(yPosition);
  //console.log(SPINNER_HEIGHT);

  if (zahl==1){

	if (yPosition > SPINNER_HEIGHT / 2 && currentPosition[zahl] !=3) {

		targetPosition[zahl]=currentPosition[zahl]+1

	} else if (yPosition < SPINNER_HEIGHT / 2 && currentPosition[zahl] != 0) {
		targetPosition[zahl] = currentPosition[zahl] - 1;

  }
  }
  else if (zahl==3){

	if (yPosition > SPINNER_HEIGHT / 2 && currentPosition[zahl] !=1) {
		//console.log(zahl);
		targetPosition[zahl]=currentPosition[zahl]+1

	} else if (yPosition < SPINNER_HEIGHT / 2 && currentPosition[zahl] != 0) {
		targetPosition[zahl] = currentPosition[zahl] - 1;

  }
  }
  else if (zahl==5){

	if (yPosition > SPINNER_HEIGHT / 2 && currentPosition[zahl] !=2) {
		//console.log(zahl);
		targetPosition[zahl]=currentPosition[zahl]+1

	} else if (yPosition < SPINNER_HEIGHT / 2 && currentPosition[zahl] != 0) {
		targetPosition[zahl] = currentPosition[zahl] - 1;

  }
  } else {

	  if (yPosition > SPINNER_HEIGHT / 2 && currentPosition[zahl] !=9) {

		targetPosition[zahl]=currentPosition[zahl]+1

	} else if (yPosition < SPINNER_HEIGHT / 2 && currentPosition[zahl] != 0) {
		targetPosition[zahl] = currentPosition[zahl] - 1;
		//console.log(targetPosition[zahl]);
	}
  //console.log(targetPosition[zahl]);

}
move();
  }
}

function getPosition(element) {
  // Helper function
  // Source: http://www.kirupa.com/html5/getting_mouse_click_position.htm
  var xPosition = 0;
  var yPosition = 0;

  while (element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }

  return {
    x: xPosition,
    y: yPosition
  };
  }
function dragKalender(ev){
	 //ev.dataTransfer.setData("text", ev.target.id);
	 document.getElementById('AV-abreissen').play();
	 kalendertest=1
}

function allowDrop(ev){
	ev.preventDefault();
}

function dropKalender(ev){
	ev.preventDefault();
	if (kalendertest==1){


	kalenderblatt.classList.toggle("hide");
	hintergrund.removeAttribute("ondragover");
	hintergrund.removeAttribute("ondrop");
	document.cookie="kalender=done";
	for (i = 1; i < 9; i++) {
		rad="number"+i
		document.getElementById(rad).addEventListener("mousedown", getClickPosition, false);
		move();
	}

}
}

function checkLicht(){
	var abstimmungszettelBCookie = getCookie("abstimmungszettelB");
	if (abstimmungszettelBCookie=="done"){
		nacht.classList.toggle("hide");
		schalter.classList.toggle("hide");
		
	}
	
	var aufziehschluesselCookie = getCookie("aufziehschluessel");
	if (aufziehschluesselCookie=="done"){
		aufziehschluessel3.classList.toggle("hide");
		
	}
	var kalenderCookie = getCookie("kalender");
	if (kalenderCookie=="done"){
		kalenderblatt.classList.toggle("hide");
		for (i = 1; i < 9; i++) {
			rad="number"+i
			document.getElementById(rad).addEventListener("mousedown", getClickPosition, false);
			move();
		
	}	
	}
	var aufziehenCookie=getCookie("aufziehen");
	if (aufziehenCookie=="done"){
		document.getElementById("AV-ticken").play();
		document.getElementById("AV-ticken").loop = true;
		updateSeconds();
		setInterval(updateSeconds, 1000);
	}
}

function setup() {
  wecker.addEventListener("click", showClock);
  weckerdrehen.addEventListener("click", turnClock);
  abstimmungszettel.addEventListener("click", openPuzzle);
  kalenderblatt.addEventListener("mousedown", dragKalender);
  schalter.addEventListener("click", lichtAn);
  aufziehschluessel3.addEventListener("click", findKey);
  hourDiv.addEventListener("mousedown",startDrag);
  timerDiv.addEventListener("mousedown",startDrag);
  checkLicht();
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
