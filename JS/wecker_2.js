// Wenn der Wecker geklickt wird, wird diese Funktion aufgerufen
// Sie bewirkt, dass das Placeholder-Rätsel angezeigt wird
function showPuzzle() {
  var puzzle1 = document.getElementById("puzzle1");
  puzzle1.classList.toggle("display");
}

// Diese Funktion vergleicht den im Placeholder-Rätsel-Formular eingegebenen
// Wert (solution1) mit dem Lösungswort 
function checkPuzzle1() {
  var solution1 = document.forms["puzzle1"]["solution1"].value;
  if (solution1 == "1937") {
    window.alert("Glückwunsch! Diese Antwort ist richtig!");
  }
}

// function setup() {
//   document.addEventListener([myEvent], [myFunction]);
// }

// window.addEventListener("load", setup);
