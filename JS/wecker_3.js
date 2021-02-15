
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

function setup() {
  abstimmungszettel.addEventListener("click", zeigFrage);
  document.getElementById("button_solution").addEventListener("click", checkpuzzle);

   }

window.addEventListener("load", setup);



