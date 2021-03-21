
var hintergrund=document.getElementById("hintergrund");
// Wecker auf Nachttisch
var frage = document.getElementsByClassName("quizbox")[0];
var anzeige=0

var alert_wrongAnswer = document.getElementById("alert_wrongAnswer");

// Abstimmungszettel
var abstimmungszettel = document.getElementById("abstimmungszettel");

function richtig(){
	location.assign("resultat.html");
}

function restoreFrage(){
	document.getElementById("button_alert").removeEventListener("click", restoreFrage);
	alert_wrongAnswer.classList.toggle("display");
	frage.style.opacity="1";
}

function falsch(){
	alert_wrongAnswer.classList.toggle("display");
	frage.style.opacity="0";
	document.getElementById('3_nein').play();
	document.getElementById("button_alert").addEventListener("click", restoreFrage);
}

function zeigFrage(){
	frage.classList.toggle("display");
	if (anzeige==0){
	hintergrund.addEventListener("click", zeigFrage);
	anzeige=1
	} else{
		hintergrund.removeEventListener("click", zeigFrage);
		anzeige=0;
	}
}

function checkpuzzle(){
	if (document.getElementById("ja").checked == true){
		richtig();

	} else{
		falsch();
	}
}

// Funktion, die das Default Behaviour der Enter-Taste
// (Formular abschicken mit POST) verhindert
// Ebenso das Default Behaviour der Backspace-Taste
// (zurück zur letzten Seite)
function preventEnter(event) {
  if (event.key == "Enter" || (event.keyCode == 8 && event.target == document.body)){
    event.preventDefault();
    // alert("Enter key was pressed!");
  }
}

function setup() {
  abstimmungszettel.addEventListener("click", zeigFrage);
  document.getElementById("button_solution").addEventListener("click", checkpuzzle);
	document.addEventListener("keypress", preventEnter);
   }

window.addEventListener("load", setup);
