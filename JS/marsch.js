// Ruth
var ruth = document.getElementById("ruth");
var rede = document.getElementById("rede");

// Zeitungsartikel
var zeitungsstapel = document.getElementById("zeitungsstapel");
var zeitungsartikel = document.getElementById("zeitungsartikel");
var arrowLeft = document.getElementById("arrowLeft");
var arrowRight = document.getElementById("arrowRight");
var arrowDown = document.getElementById("arrowDown");
var arrowUp = document.getElementById("arrowUp");
var zeitungWeg_1 = document.getElementById("zeitungWeg_1");
var zeitungWeg_2 = document.getElementById("zeitungWeg_2");
var currentArticle = document.getElementById("artikelbild");
var fileNameList = [
  "Bilder/Zeitungsartikel/Werbung_Marsch.png",
  "Bilder/Zeitungsartikel/Hinweis_Marsch.png"
];

// Fahne
var fahne = document.getElementById("fahne");

// Quiz
var button_startPuzzle = document.getElementById("startPuzzle");
var button_solution = document.getElementById("button_solution");
var puzzle = document.getElementById("puzzle");
var alert_wrongAnswer = document.getElementById("alert_wrongAnswer");
var button_alert = document.getElementById("button_alert");

// Wenn die Quizfrage zu Ruths Rede beantwortet wurde und die Zeitungsschnipsel
// angeschaut wurden, haben die Variablen den Wert "true"
// Bedingung dafür, dass die Fahne nach dem Quiz angezeigt wird
var paper_read = false;
var puzzle_solved = false;

// Fahne in Ruths Hand platzieren
function placeFlag() {
  fahne.style.right = "10%";
  fahne.removeEventListener("dragend", placeFlag);
  setTimeout(function() {location.assign("Karte.html");}, 5000);
}

// Fahne anzeigen
function showFlag() {
  if (paper_read == true && puzzle_solved == true) {
    fahne.classList.toggle("display");
    // fahne.addEventListener("drag", function(e) {e.preventDefault();});
    fahne.addEventListener("dragend", placeFlag);
  }
}

// Quiz erneut anzeigen, wenn Antwort falsch war
function reDisplayPuzzle() {
  alert_wrongAnswer.classList.toggle("display");
  puzzle.classList.toggle("display");
  button_alert.removeEventListener("click", reDisplayPuzzle);
}

// Quizantwort überprüfen
function checkPuzzle() {

  // Was die Spielerin eingegeben hat bei der aktuellen Rätselfrage
  var playerSolution = document.forms["puzzle_marsch"]["attitude"].value;
  // richtige Antwort
  if (playerSolution == "aendern") {
    puzzle_solved = true;
    puzzle.classList.toggle("display");
    button_startPuzzle.classList.toggle("display");
    showFlag();
  }
  else {
    puzzle.classList.toggle("display");
    alert_wrongAnswer.classList.toggle("display");
    button_alert.addEventListener("click", reDisplayPuzzle);
  }
}

// Quiz starten
function startPuzzle() {
  // Div mit Rätselfrage anzeigen
  puzzle.classList.toggle("display");
  // puzzleDiv.querySelector("form").focus(); //not working yet
  document.addEventListener("keypress", function(event) {preventEnter(event);})
  button_solution.addEventListener("click", checkPuzzle);
  button_startPuzzle.removeEventListener("click", startPuzzle);
}
// Quizbutton anzeigen - erst nachdem Ruth gesprochen hat
function showQuizButton() {
  button_startPuzzle.classList.toggle("display");
  button_startPuzzle.addEventListener("click", startPuzzle);
}

// Ruths Rede starten
function startSpeech() {
  rede.play();
  ruth.removeEventListener("click", startSpeech);
  rede.addEventListener("ended", showQuizButton);
}

// Funktion, die das Default Behaviour der Enter-Taste
// (Formular abschicken mit POST) verhindert
function preventEnter(event) {
  if (event.key == "Enter"){
    event.preventDefault();
    // alert("Enter key was pressed!");
  }
}

// Zeitungsartikel verstecken
function hidePaper() {
  zeitungsartikel.classList.toggle("display");
  if (arrowRight.classList.contains("display")) {
    arrowRight.classList.toggle("display");
  }
  else if (arrowLeft.classList.contains("display")) {
    arrowLeft.classList.toggle("display");
  }
  hintergrund.style.opacity = "1";
  zeitungWeg_1.removeEventListener("click", hidePaper);
  zeitungWeg_2.removeEventListener("click", hidePaper);
  arrowLeft.removeEventListener("click", switchArticle);
  arrowRight.removeEventListener("click", switchArticle);
  paper_read = true;
  showFlag();
}

// Zwischen den Zeitungsartikeln wechseln
function switchArticle() {

  if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Werbung_Marsch.png") {
    currentArticle.attributes[1].value = "Bilder/Zeitungsartikel/Hinweis_Marsch.png";
    arrowRight.classList.toggle("display");
    arrowLeft.classList.toggle("display");
    arrowRight.removeEventListener("click", switchArticle);
    arrowLeft.addEventListener("click", switchArticle);
  }
  else if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Hinweis_Marsch.png") {
    currentArticle.attributes[1].value = "Bilder/Zeitungsartikel/Werbung_Marsch.png";
    arrowLeft.classList.toggle("display");
    arrowRight.classList.toggle("display");
    arrowLeft.removeEventListener("click", switchArticle);
    arrowRight.addEventListener("click", switchArticle);
  }
}

// Zeitungsartikel anzeigen
function showPaper() {
  hintergrund.style.opacity = "0.2";
  zeitungsartikel.classList.toggle("display");
  if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Werbung_Marsch.png") {
    arrowRight.classList.toggle("display");
    arrowRight.addEventListener("click", switchArticle);
  }
  else if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Hinweis_Marsch.png") {
    arrowLeft.classList.toggle("display");
    arrowLeft.addEventListener("click", switchArticle);
  }
  zeitungWeg_1.addEventListener("click", hidePaper);
  zeitungWeg_2.addEventListener("click", hidePaper);
}


// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
function showArea(area) {
  area.style.cursor = "pointer";
}

function setup() {
  zeitungsstapel.addEventListener("click", showPaper);
  // Noch ersetzen durch Fläche Ruth - Achtung: image areas dürfen sich
  // evtl. nicht überlappen?
  ruth.addEventListener("click", startSpeech);
  ruth.addEventListener("mouseover", function(event) {showArea(event.target)});
  // zeitungWeg_1.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);
