// Hintergrundbild
var hintergrund = document.getElementById("hintergrund");

// Ruth und Lisi
var ruth = document.getElementById("ruth");
var rede = document.getElementById("rede");
var lisi = document.getElementById("lisi");
// Ruths Mund
var mund = document.getElementById("mund");
var mouthInterval = undefined;

// Zeitungsartikel
var zeitungsstapel = document.getElementById("zeitungsstapel");
var zeitungsartikel = document.getElementById("zeitungsartikel");
// var arrowLeft = document.getElementById("arrowLeft");
// var arrowRight = document.getElementById("arrowRight");
var arrowDown = document.getElementById("arrowDown");
var arrowUp = document.getElementById("arrowUp");
var zeitungWeg_1 = document.getElementById("zeitungWeg_1");
var zeitungWeg_2 = document.getElementById("zeitungWeg_2");
var currentArticle = document.getElementById("artikelbild");
// var fileNameList = [
//   "Bilder/Zeitungsartikel/Werbung_Marsch.png",
//   "Bilder/Zeitungsartikel/Hinweis_Marsch.png"
// ];

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

// Für die Mundbewegungen
function toggleMouth() {
  mund.classList.toggle("display");
}

function startInterval() {
  mouthInterval = setInterval(toggleMouth, 700);
}

function pauseInterval() {
  clearInterval(mouthInterval);
}

// Fahne in Lisis Hand platzieren
function placeFlag(event) {
  document.removeEventListener("mousemove", moveFlag);
  fahne.style.left = "395px";
  fahne.style.top = "20px";
  setTimeout(function() {location.assign("Karte.html");}, 3000);
}

// Fahne bewegen
function moveFlag(event) {
  fahne.removeEventListener("dragend", function(){document.addEventListener("mousemove", moveFlag);});
  var windowMarginLeft = (window.innerWidth - 1200) / 2;
  // Die Fahne ist immer dort, wo der Mauszeiger ist
  // bzw. 20px rechts davon, damit auf Vrenis Kopf geklickt
  // werden kann, ohne dass die Fahne im Weg ist
  fahne.style.left = event.clientX - windowMarginLeft + 20 + 'px';
  fahne.style.top = event.clientY -50 + 'px';
  lisi.addEventListener("click", placeFlag);
}

// Fahne anzeigen
function showFlag() {
  if (paper_read == true && puzzle_solved == true) {
    fahne.classList.toggle("display");
    fahne.addEventListener("dragend", function(){document.addEventListener("mousemove", moveFlag);});
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
  var playerSolution = document.forms["puzzle_marsch"]["recht"].value;
  // richtige Antwort
  if (playerSolution == "diskriminierung") {
    puzzle_solved = true;
    puzzle.classList.toggle("display");
    // button_startPuzzle.classList.toggle("display");
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
  // button_startPuzzle.removeEventListener("click", startPuzzle);
}
// Quizbutton anzeigen - erst nachdem Ruth gesprochen hat
// function showQuizButton() {
//   button_startPuzzle.classList.toggle("display");
//   button_startPuzzle.addEventListener("click", startPuzzle);
// }

// Ruths Rede starten
function startSpeech() {
  rede.play();
  startInterval();
  ruth.removeEventListener("click", startSpeech);
  // rede.addEventListener("ended", showQuizButton);
  rede.addEventListener("ended", pauseInterval);
  rede.addEventListener("ended", startPuzzle);
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
  if (arrowDown.classList.contains("display")) {
    arrowDown.classList.toggle("display");
  }
  else if (arrowUp.classList.contains("display")) {
    arrowUp.classList.toggle("display");
  }
  hintergrund.style.opacity = "1";
  zeitungWeg_1.removeEventListener("click", hidePaper);
  zeitungWeg_2.removeEventListener("click", hidePaper);
  arrowDown.removeEventListener("click", switchArticle);
  arrowUp.removeEventListener("click", switchArticle);
  paper_read = true;
  showFlag();
}

// Zwischen den Zeitungsartikeln wechseln
function switchArticle() {

  if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Vorbehalte_Lotti_2_oben.png") {
    currentArticle.attributes[1].value = "Bilder/Zeitungsartikel/Vorbehalte_Lotti_2_unten.png";
    arrowDown.classList.toggle("display");
    arrowUp.classList.toggle("display");
    arrowDown.removeEventListener("click", switchArticle);
    arrowUp.addEventListener("click", switchArticle);
  }
  else if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Vorbehalte_Lotti_2_unten.png") {
    currentArticle.attributes[1].value = "Bilder/Zeitungsartikel/Vorbehalte_Lotti_2_oben.png";
    arrowDown.classList.toggle("display");
    arrowUp.classList.toggle("display");
    arrowUp.removeEventListener("click", switchArticle);
    arrowDown.addEventListener("click", switchArticle);
  }
}

// Zeitungsartikel anzeigen
function showPaper() {
  hintergrund.style.opacity = "0.2";
  zeitungsartikel.classList.toggle("display");
  if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Vorbehalte_Lotti_2_oben.png") {
    arrowDown.classList.toggle("display");
    arrowDown.addEventListener("click", switchArticle);
  }
  else if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Vorbehalte_Lotti_2_unten.png") {
    arrowUp.classList.toggle("display");
    arrowUp.addEventListener("click", switchArticle);
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
  ruth.addEventListener("click", startSpeech);
  // lisi.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);
