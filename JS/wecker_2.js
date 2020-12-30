// ToDo: Weckeransichten von vorne/von hinten sollen nicht
// gleichzeitig sichtbar sein!

// Wecker auf Nachttisch
var wecker = document.getElementById("wecker");
var abstimmungszettel = document.getElementById("abstimmungszettel");
// Rand von Wecker gross von vorne
var wecker_rand = document.getElementById("wecker_rand");
// Ziffernblatt
var clockbox = document.getElementById("clockbox");
var wecker_vorne = document.getElementById("wecker_vorne");
var wecker_hinten = document.getElementById("wecker_hinten");

const secDiv = document.getElementById('sec');
const minDiv = document.getElementById('min');
const hourDiv = document.getElementById('hour');
const timerDiv = document.getElementById('timer');

var centerX=792;
var centerY=350;

// Wenn der Wecker geklickt wird, wird diese Funktion aufgerufen
// Sie bewirkt, dass der Wecker in gross angezeigt wird

function showClock() {
  clockbox.classList.toggle("display");
  wecker_vorne.classList.toggle("display");
}

function turnClock() {
  // Wecker (Ansicht von vorne) verstecken
  clockbox.classList.toggle("display");
  wecker_vorne.classList.toggle("display");
  wecker_hinten.classList.toggle("display");
}

function openPuzzle() {
		location.assign("abstimmungszettel.html");
}
setInterval(updateSeconds, 1000);
function updateClock(){
	let date = new Date();
	let sec = date.getSeconds() / 60;
	let min = (date.getMinutes() + sec) / 60;
	let hour = (date.getHours() + min) / 12;

	secDiv.style.transform = "rotate(" + (sec * 360) + "deg)";
	minDiv.style.transform = "rotate(185deg)";
	hourDiv.style.transform = "rotate(75deg)"
	timerDiv.style.transform = "rotate(210deg)";
	
}
function updateSeconds(){
	let date = new Date();
	let sec = date.getSeconds() / 60;
	let min = (date.getMinutes() + sec) / 60;
	let hour = (date.getHours() + min) / 12;

	secDiv.style.transform = "rotate(" + (sec * 360) + "deg)";
	
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
	console.log(ev);
	ev.dataTransfer.setDragImage(new Image(), 0, 0)
	
	
}

function drop(ev) {
	
	var punktX=ev.clientX;
	var punktY=ev.clientY;
	console.log(punktX);
	console.log(punktY);
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
	console.log(hypotenuse);
	radian=Math.asin(gegenkathete/hypotenuse);
	winkel=radian*(180/Math.PI)
	console.log(winkel);
	
	
	var testX = Math.sign(centerX-punktX);
	console.log(testX);
	var testY = Math.sign(centerY-punktY);
	console.log(testY);
	
		
	if (testX==1) {
		if (testY==-1){
			winkel=180+winkel;
			console.log(winkel);
			hourDiv.style.transform = "rotate("+winkel+"deg)";
			
		} if (testY==1) {
			
			winkel=360-winkel;
			console.log(winkel);
			hourDiv.style.transform = "rotate("+winkel+"deg)";
		}
		
	}
	
	if (testX==-1) {
		if (testY==-1){
			Hwinkel=90-winkel;
			Kwinkel=90+Hwinkel;
			console.log(Kwinkel);
			hourDiv.style.transform = "rotate("+Kwinkel+"deg)";
			
		} if (testY==1){
			
			console.log(winkel);
			hourDiv.style.transform = "rotate("+winkel+"deg)";
		}
		
	}
	
	
}

function setup() {
  wecker.addEventListener("click", showClock);
  wecker_rand.addEventListener("click", turnClock);
  abstimmungszettel.addEventListener("click", openPuzzle);
  updateClock();
  updateSeconds();
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
