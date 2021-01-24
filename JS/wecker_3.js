
var hintergrund=document.getElementById("hintergrund");
// Wecker auf Nachttisch
var frage = document.getElementById("frage");
var anzeige=0

// Abstimmungszettel
var abstimmungszettel = document.getElementById("abstimmungszettel");

function richtig(){
	location.assign("resultat.html");
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


function setup() {
  abstimmungszettel.addEventListener("click", zeigFrage);

   }

window.addEventListener("load", setup);



