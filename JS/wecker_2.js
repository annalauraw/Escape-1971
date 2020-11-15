// Wenn der Wecker geklickt wird, wird diese Funktion aufgerufen
// Sie bewirkt, dass der Wecker in gross angezeigt wird
function showClock() {
  var clockbox = document.getElementById("clockbox");
  var wecker_vorne = document.getElementById("wecker_vorne");
  clockbox.classList.toggle("display");
  wecker_vorne.classList.toggle("display");
}

function setup() {
  var wecker = document.getElementById("wecker");
  wecker.addEventListener("click", showClock);
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
