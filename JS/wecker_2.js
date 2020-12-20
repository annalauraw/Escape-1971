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
		location.assign("Abstimmungszettel.html");
}

function setup() {
  wecker.addEventListener("click", showClock);
  wecker_rand.addEventListener("click", turnClock);
  abstimmungszettel.addEventListener("click", openPuzzle);
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
