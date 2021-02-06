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

var button_startPuzzle = document.getElementById("startPuzzle");
var puzzle = document.getElementById("puzzle");

// Funktion, die das Default Behaviour der Enter-Taste
// (Formular abschicken mit POST) verhindert
function preventEnter(event) {
  if (event.key == "Enter"){
    event.preventDefault();
    // alert("Enter key was pressed!");
  }
}

// Quiz starten
function startPuzzle() {
  // Div mit Rätselfrage anzeigen
  puzzle.classList.toggle("display");
  // puzzleDiv.querySelector("form").focus(); //not working yet
  document.addEventListener("keypress", function(event) {preventEnter(event);})
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
  // Button anzeigen
  button_startPuzzle.classList.toggle("display");
  button_startPuzzle.addEventListener("click", startPuzzle);
}

// Funktion, die prüft, mit welchem Index der Liste
// der Dateiname übereinstimmt
// function compareFileName(file) {
//   return file == currentArticle.attributes[1].value;
// }

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
  // articleIndex = fileNameList.findIndex(compareFileName);
  // if (direction == "right") {
  //   // Bildpfad ersetzen
  //   if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Werbung_Marsch.png") {
  //     currentArticle.attributes[1].value = "Bilder/Zeitungsartikel/Hinweis_Marsch.png";
  //     arrowRight.classList.toggle("display");
  //     arrowLeft.classList.toggle("display");
  //     arrowRight.removeEventListener("click", function() {switchArticle("right");});
  //     arrowLeft.addEventListener("click", function() {switchArticle("left");});
  //   }
  //   else if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Hinweis_Marsch.png") {
  //     currentArticle.attributes[1].value = "Bilder/Zeitungsartikel/Werbung_Marsch.png";
  //     arrowLeft.classList.toggle("display");
  //     arrowRight.classList.toggle("display");
  //     arrowLeft.removeEventListener("click", function() {switchArticle("right");});
  //     arrowRight.addEventListener("click", function() {switchArticle("left");});
  //   }
  // }
  // else if (direction == "left") {
  //   // Bildpfad ersetzen
  //   if (articleIndex >= 1) {
  //     currentArticle.attributes[1].value = fileNameList[articleIndex - 1];
  //     articleIndex -= 1;
  //   }
  //   else {
  //     currentArticle.attributes[1].value = fileNameList[4];
  //     articleIndex = 4;
  //   }
  // }
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
  // Quizfragen
  // button_solution_1.addEventListener("click", function() {checkPuzzle(this);});
  // button_solution_2.addEventListener("click", function() {checkPuzzle(this);});
  // button_solution_3.addEventListener("click", function() {checkPuzzle(this);});
  zeitungsstapel.addEventListener("click", showPaper);
  // zeitungWeg_1.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);
