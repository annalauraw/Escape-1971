
var zuerich=document.getElementById("zuerich");
var stgallen=document.getElementById("stgallen");
var schaffhausen=document.getElementById("schaffhausen");
var basel=document.getElementById("basel");
var biel=document.getElementById("biel");
var lugano=document.getElementById("lugano");
var neuenburg=document.getElementById("neuenburg");
var lausanne=document.getElementById("lausanne");
var chur=document.getElementById("chur");
var genf=document.getElementById("genf");
var freiburg=document.getElementById("freiburg");
var luzern=document.getElementById("luzern");
var winterthur=document.getElementById("winterthur");
var sion=document.getElementById("sion");



function falsch() {

	document.getElementById("3_nein").play();
}

function richtig (){
	document.getElementById("4_ab_nach_Bern").play();
	bern.setAttribute("r","10")
	bern.setAttribute("fill","#ad66ff")
	document.getElementById('4_ab_nach_Bern').addEventListener("ended", function () {
			location.assign("bundesplatz.html");
		});

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
  zuerich.addEventListener("click", falsch);
  stgallen.addEventListener("click", falsch);
  basel.addEventListener("click", falsch);
  schaffhausen.addEventListener("click", falsch);
  biel.addEventListener("click", falsch);
  neuenburg.addEventListener("click", falsch);
  lausanne.addEventListener("click", falsch);
  genf.addEventListener("click", falsch);
  chur.addEventListener("click", falsch);
  freiburg.addEventListener("click", falsch);
  luzern.addEventListener("click", falsch);
  lugano.addEventListener("click", falsch);
  winterthur.addEventListener("click", falsch);
  bern.addEventListener("click", richtig);
  sion.addEventListener("click", falsch);
	document.addEventListener("keypress", preventEnter);
  //puzzleLieberherrButton.addEventListener("click", checkPuzzle);
}

window.addEventListener("load", setup);
