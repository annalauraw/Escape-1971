// Button "Rätsel starten"
var button_startPuzzle = document.getElementById("startPuzzle");
// Button, der die Antworten zu den Lieberherr-Fragen "abschickt"
var puzzleLieberherrButton = document.getElementById("puzzleLieberherrButton");
// div mit Rätsel zum Video
var puzzle_lieberherrQuestions = document.getElementById("puzzle_lieberherrQuestions");
// Rätsel zum Video, Formular mit Fragen und Eingabefeldern
var form_lieberherrQuestions = document.forms["puzzle_LieberherrQuestions"];
// div mit Hintergrundbild - wird für das Erscheinen bzw. Bewegen der Fahne
// gebraucht
var hintergrund = document.getElementById("hintergrund");
// Fahnen-Bild
var flag = document.getElementById("fahne");
// Button am Fernseher, der das Lieberherr-Video startet
// Noch passiert nichts, wenn man klickt
var button_lieberherr = document.getElementById("button_lieberherr");
// Helvetias Hand
var helvetia = document.getElementById("helvetia");

// Funktion, die das Rätsel zu Lieberherr anzeigt
function startPuzzle() {
  puzzle_lieberherrQuestions.classList.toggle("display");
}

// Funktion, die die Fahne bewegt
function moveFlag(event) {
  // var outerDiv = document.getElementsByClassName("imagecontainer").item(0);
  var windowMarginLeft = (window.innerWidth - 1200) / 2;
  // var windowMarginTop = window.innerWidth - outerDiv.height;
  // Die Fahne ist immer dort, wo der Mauszeiger ist
  // bzw. 20px rechts davon, damit auf Helvetias Hand geklickt
  // werden kann, ohne dass die Fahme im Weg ist
  flag.style.left = event.clientX - windowMarginLeft + 20 + 'px';
  flag.style.top = event.clientY -50 + 'px';
  helvetia.addEventListener("click", putFlag);

}

// Wenn Fahne an den richtigen Koordinaten ist: Helvetia in die Hand drücken
function putFlag() {
  document.removeEventListener("mousemove", moveFlag);
  flag.style.left = "662.5px";
  flag.style.top = "-4px";
}

// Funktion, die die Fahne erscheinen lässt: Es wird ein addEventListener
// für die Mausbewegungen im äussersten div registriert
function callFlag() {
  document.addEventListener("mousemove", moveFlag);
  flag.classList.toggle("display");
  // Übergangslösung
  // button_removeFlag.addEventListener("click", stopFlag);
}

function checkPuzzle() {
  // Was die Spielerin eingegeben hat
  var solution1 = document.forms["puzzle_lieberherrQuestions"]["solution1"].value;
  // var solution2 = document.forms["puzzle_videoQuestions"]["solution2"].value;
  // var solution3 = document.forms["puzzle_videoQuestions"]["solution3"].value;
  // Hier evtl mit RegEx arbeiten, damit Varianten als richtig erkannt werden
  if (solution1 == "Händ Vertrauen mit den Frauen!") {
    // window.alert("Glückwunsch! Diese Antwort ist richtig!");
    puzzle_lieberherrQuestions.classList.toggle("display");
    callFlag();
  }
}

// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
// function showArea(area) {
//   area.style.cursor = "pointer";
// }

function setup() {
  button_startPuzzle.addEventListener("click", startPuzzle);
  puzzleLieberherrButton.addEventListener("click", checkPuzzle);
  // button_lieberherr.addEventListener("mouseover", function(event) {showArea(event.target)});
  // helvetia.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);
