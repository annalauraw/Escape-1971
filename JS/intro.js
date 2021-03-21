// Hintergrundbild
var hintergrund = document.getElementById("hintergrund");

// Knöpfe an Fernseher und Radio, um Videos/Song zu starten
var button_lotti = document.getElementById("button_lotti");
var button_unterbaech = document.getElementById("button_unterbaech");
var button_herzig = document.getElementById("button_herzig");
var button_radio_noise = document.getElementById("button_radio_noise");
var button_radio_song = document.getElementById("button_radio_song");
var radiosong = document.getElementById("radiosong");
var rauschen = document.getElementById("rauschen");

// grosser Fernseher
var fernseher= document.getElementById("fernseher");
// Fläche des kleinen Fernsehers: Bei Klick darauf erscheint der grosse
var tv_gross = document.getElementById("tv_gross");
// Fläche links und rechts neben Fernseher im Hintergrund -
// Klick lässt grossen Fernseher verschwinden
var area_hideTV_1 = document.getElementById("area_hideTV_1");
var area_hideTV_2 = document.getElementById("area_hideTV_2");
// Schwarzer Hintergrund wegen durchsichtigem Bildschirm
var black = document.getElementById("tv_black");
// var blackIsDisplayed = false;

// Untertitel
var untertitel_lotti = document.getElementById("untertitel_lotti");
var untertitel_unterbaech = document.getElementById("untertitel_unterbaech");
var untertitel_herzig = document.getElementById("untertitel_herzig");

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
  "Bilder/Zeitungsartikel/Stimmrecht_Basel.jpg",
  "Bilder/Zeitungsartikel/Wut_1.png",
  "Bilder/Zeitungsartikel/Vorbehalte_Lotti_1.png",
  // "Bilder/Zeitungsartikel/Vorbehalte_Lotti_2_oben.png"
];
// Muss global verfügbar sein
var articleIndex = 0;

// Button "Ich bin informiert", startet das Rätsel zum Video
var button_startPuzzle = document.getElementById("startPuzzle");

// Was wurde bereits angesehen?
var tv_watched = false;
var paper_read = false;
var radio_listened = false;

// Buttons 'Senden', um die eingegebenen Lösungswörter zu überprüfen
var button_solution_1 = document.getElementById("button_solution_1");
var button_solution_2 = document.getElementById("button_solution_2");
var button_solution_3 = document.getElementById("button_solution_3");

// div mit Rätsel zum Video
var puzzle_videoQuestions = document.getElementById("puzzle_videoQuestions");
// div mit Alert "Falsche Antwort"
var alert_wrongAnswer = document.getElementById("alert_wrongAnswer");
button_alert = document.getElementById("button_alert");

// Rätsel zum Video, Formular mit Fragen und Eingabefeldern
var form_videoQuestions = document.forms["puzzle_videoQuestions"];

// Hilfe_Box
var hint = document.getElementById("hint");

// SRF Player wird mit einem ersten Video geladen (Lotti Ruckstuhl)
var player = SRG.PlayerManager.createPlayer('SRF_player','inline','urn:srf:video:d43543bb-f5ed-45b6-96e3-a1c065c40335&start=19');
var player_isDisplayed = false;

// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
function showArea(area) {
  area.style.cursor = "pointer";
}

// Grossen Fernseher verstecken
function hideTV() {
  button_lotti.removeEventListener("click", boundFunctionLotti);
  button_unterbaech.removeEventListener("click", boundFunctionUnterbaech);
  button_herzig.removeEventListener("click", boundFunctionHerzig);
  fernseher.classList.toggle("display");
  if (player_isDisplayed) {
    SRF_player.classList.toggle("display");
    player_isDisplayed = false;
  }
  if (black.classList.contains("display")) {
    black.classList.toggle("display");
  }
  tv_watched = true;
  // Wenn alle Medien schonmal angeschaut wurden, Button "informiert" anzeigen
  if (paper_read == true && radio_listened == true) {
    if (button_startPuzzle.classList.contains("display") == false) {
      button_startPuzzle.classList.toggle("display");
      button_startPuzzle.addEventListener("click", startPuzzle);
    }
  }
}

// Grossen Fernseher anzeigen
function showTV() {
  black.classList.toggle("display");
  fernseher.classList.toggle("display");
  area_hideTV_1.addEventListener("click", hideTV);
  area_hideTV_2.addEventListener("click", hideTV);
  button_lotti.addEventListener("click", boundFunctionLotti);
  button_unterbaech.addEventListener("click", boundFunctionUnterbaech);
  button_herzig.addEventListener("click", boundFunctionHerzig);
}

lotti = new SRF_Video('lotti', 'urn:srf:video:9b110c29-9032-4d65-bd8b-e60c39d30e0a', 535, 609, untertitel_lotti);
unterbaech = new SRF_Video('unterbaech', 'urn:srf:video:5daf0760-6a4d-441a-9bf9-0a1cb9cb511a', 1045.9, 1062.5, untertitel_unterbaech);
// appenzell = new SRF_Video('appenzell', 'urn:srf:video:ad22fde5-2351-4d18-9cf2-9954c194d3a3', 0, 53, untertitel_appenzell);
herzig = new SRF_Video('herzig', 'urn:srf:video:bab98121-00a9-405d-b13e-572e7ecb098d',  356, 393.5, untertitel_herzig);

// Bound functions for event listeners
var boundFunctionLotti = lotti.handle.bind(lotti);
var boundFunctionUnterbaech = unterbaech.handle.bind(unterbaech);
var boundFunctionHerzig = herzig.handle.bind(herzig);

// Funktion, die alle evtl. laufende Radiosounds vorsorglich stoppt
function stopRadio() {
  radiosong.pause();
  rauschen.pause();
}

// Funktion, die den Radio-Song abspielt
function playSound(sound, button) {
  if (sound.paused == false) {
    sound.pause();
  }
  else {
    stopRadio();
    sound.play();
    if (button == button_radio_song) {
      sound.addEventListener("ended", function() {
        radio_listened = true;
        // Wenn alle Medien schonmal angeschaut wurden, Button "informiert" anzeigen
        if (tv_watched == true && paper_read == true) {
          if (button_startPuzzle.classList.contains("display") == false) {
            button_startPuzzle.classList.toggle("display");
            button_startPuzzle.addEventListener("click", startPuzzle);
          }
        }
      });
    }
  }
}

// Anonyme Funtion muss einer Variablen zugewiesen werden, damit der
// Eventlistener wieder entfernt werden kann
var switchLeft = function() {switchArticle("left");};
var switchRight = function() {switchArticle("right");};
var switchDown = function() {switchArticlePart("down");};
var switchUp = function() {switchArticlePart("up");};


// Zeitungsartikel verstecken
function hidePaper() {
  zeitungsartikel.classList.toggle("display");
  arrowLeft.classList.toggle("display");
  arrowRight.classList.toggle("display");
  if (arrowDown.classList.contains("display")) {
    arrowDown.classList.toggle("display");
  }
  else if (arrowUp.classList.contains("display")) {
    arrowUp.classList.toggle("display");
  }
  hintergrund.style.opacity = "1";
  zeitungWeg_1.removeEventListener("click", hidePaper);
  zeitungWeg_2.removeEventListener("click", hidePaper);
  arrowLeft.removeEventListener("click", switchLeft);
  arrowRight.removeEventListener("click", switchRight);
  paper_read = true;
  // Wenn alle Medien schonmal angeschaut wurden, Button "informiert" anzeigen
  if (tv_watched == true && radio_listened == true) {
    if (button_startPuzzle.classList.contains("display") == false) {
      button_startPuzzle.classList.toggle("display");
      button_startPuzzle.addEventListener("click", startPuzzle);
    }
  }
}

// Funktion, die prüft, mit welchem Index der Liste
// der Dateiname übereinstimmt
// function compareFileName(file) {
//   return file == currentArticle.attributes[1].value;
// }

// Zwischen den Zeitungsartikeln wechseln
function switchArticle(direction) {

  // articleIndex = fileNameList.findIndex(compareFileName);
  if (direction == "right") {
    // Bildpfad ersetzen
    if (articleIndex <= 1) {
      currentArticle.attributes[1].value = fileNameList[articleIndex + 1];
      articleIndex += 1;
    }
    else {
      currentArticle.attributes[1].value = fileNameList[0];
      articleIndex = 0;
    }
  }
  else if (direction == "left") {
    // Bildpfad ersetzen
    if (articleIndex >= 1) {
      currentArticle.attributes[1].value = fileNameList[articleIndex - 1];
      articleIndex -= 1;
    }
    else {
      currentArticle.attributes[1].value = fileNameList[2];
      articleIndex = 2;
    }
  }
  if (articleIndex == 1) {
    arrowDown.classList.toggle("display");
    // arrowUp.classList.toggle("display");
    arrowDown.addEventListener("click", switchDown);
    // arrowUp.addEventListener("click", function() {switchArticlePart("up");});
  }
  else {
    if (arrowDown.classList.contains("display")) {
      arrowDown.classList.toggle("display");
    }
    else if (arrowUp.classList.contains("display")) {
      arrowUp.classList.toggle("display");
    }
  }
  // alert("File name is: " + fileName);
}

// Zeitungsartikel "scrollen"
function switchArticlePart(direction) {
  // articleIndex = fileNameList.findIndex(compareFileName);
  if (direction == "down") {
    if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Wut_1.png") {
      currentArticle.attributes[1].value = "Bilder/Zeitungsartikel/Wut_2.png";
      arrowDown.classList.toggle("display");
      arrowUp.classList.toggle("display");
      arrowUp.addEventListener("click", switchUp);
      arrowDown.removeEventListener("click", switchDown);
    }
  }
  else if (direction == "up") {
    if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Wut_2.png") {
      currentArticle.attributes[1].value = "Bilder/Zeitungsartikel/Wut_1.png";
      arrowDown.classList.toggle("display");
      arrowUp.classList.toggle("display");
      arrowUp.removeEventListener("click", switchUp);
      arrowDown.addEventListener("click", switchDown);
    }
  }
}

// Zeitungsartikel anzeigen
function showPaper() {
  hintergrund.style.opacity = "0.2";
  zeitungsartikel.classList.toggle("display");
  arrowLeft.classList.toggle("display");
  arrowRight.classList.toggle("display");
  if (articleIndex == 1) {
    if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Wut_1.png") {
      arrowDown.classList.toggle("display");
      arrowDown.addEventListener("click", switchDown);
    }
    else if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Wut_2.png") {
      arrowUp.classList.toggle("display");
      arrowUp.addEventListener("click", switchUp);
    }
  }
  zeitungWeg_1.addEventListener("click", hidePaper);
  zeitungWeg_2.addEventListener("click", hidePaper);
  arrowLeft.addEventListener("click", switchLeft);
  arrowRight.addEventListener("click", switchRight);
  if (button_startPuzzle.classList.contains("display")) {
    button_startPuzzle.classList.toggle("display");
  }
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

// Hilfe-Box wieder verstecken
function hideHint() {
  hint.classList.toggle("display");
  button_hint.removeEventListener("click", hideHint);
  button_startPuzzle.innerHTML = "Ich bin informiert";
  button_startPuzzle.addEventListener("click", startPuzzle);
}

// Wenn der Hilfe-Button geklickt wird
function getHint() {
  button_startPuzzle.removeEventListener("click", getHint);
  var puzzleDiv = document.getElementById(puzzlePart);
  if (puzzleDiv.classList.contains("display")) {
    puzzleDiv.classList.toggle("display");
  }
  hint.classList.toggle("display");
  button_hint.addEventListener("click", hideHint);
}

// Variable, die weiss, welche Rätselfrage gerade dran ist
var puzzlePart = "puzzle_videoQuestions_1";

// Wrapper-Funktion, da von Event-Listener aufgerufen
function startPuzzle() {
  // startPuzzlePart("puzzle_videoQuestions_1");
  startPuzzlePart(puzzlePart);
  // button_startPuzzle.classList.toggle("display");
  button_startPuzzle.innerHTML = "Hilfe";
  button_startPuzzle.removeEventListener("click", startPuzzle);
  button_startPuzzle.addEventListener("click", getHint);
}

// Anonyme Funtion einer Variablen zuweisen, damit der eventListener
// später wieder entfernt werden kann
var interruptPuzzleWrapper = function(){interruptPuzzle(puzzlePart);};

// Puzzle unterbrechen
function interruptPuzzle(puzzlePart) {
  // puzzlePart: Rätselfrage, die angezeigt wurde vor dem Unterbruch
  hintergrund.removeEventListener("click", interruptPuzzleWrapper);
  var puzzleDiv = document.getElementById(puzzlePart);
  if (puzzleDiv.classList.contains("display")) {
    puzzleDiv.classList.toggle("display");
  }
  if (!alert_wrongAnswer.classList.contains("display")) {
    button_startPuzzle.innerHTML = "Ich bin informiert";
    button_startPuzzle.removeEventListener("click", getHint);
    button_startPuzzle.addEventListener("click", startPuzzle);
  }
}


function startPuzzlePart(puzzlePart) {
  // Div mit Rätselfrage anzeigen
  var puzzleDiv = document.getElementById(puzzlePart);
  if (puzzleDiv.classList.contains("display") == false) {
    puzzleDiv.classList.toggle("display");
  }
  // puzzleDiv.querySelector("form").focus(); //not working yet
  hintergrund.addEventListener("click", interruptPuzzleWrapper);
}

// Rätselfrage nach falscher Antwort erneut anzeigen
function reDisplayPuzzlePart(puzzleDiv) {
  button_startPuzzle.addEventListener("click", getHint);
  alert_wrongAnswer.classList.toggle("display");
  puzzleDiv.classList.toggle("display");
  button_alert.removeEventListener("click", reDisplayPuzzleWrapper);
  hintergrund.addEventListener("click", interruptPuzzleWrapper);
}

// Anonyme Funktion einer Variablen zuweisen, damit der eventListener
// wieder entfernt werden kann
var reDisplayPuzzleWrapper = function() {reDisplayPuzzlePart(document.getElementById(puzzlePart));}

function checkPuzzle(trigger) {

  // Was die Spielerin eingegeben hat
  var playerSolution;

  // Welcher Button hat die Funktion getriggert (id des HTML-Elements)?
  var triggeringButton = trigger.id;

  // Die Lösungsbausteine als RegEx-Muster
  // solution_1
  ersteAbstimmung = /1959/;

  // Die Lösungsbausteine als RegEx-Muster
  // solution_2
  baselStadt = /(basel[-\s]stadt|bs)/i;
  waadt = /(waadt|vaud|vd)/i;
  genf = /(genf|gen[eéè]ve|ge)/i;
  neuenburg = /(neuenburg|neuch[aâ]tel|ne)/i;

  // Die Lösungsbausteine als RegEx-Muster
  // solution_3
  unterbaech = /unterb[aä]e?ch/i;

  // Um welche Rätselfrage (welches Formular-HTML-Element)
  // geht es aktuell?
  // var puzzlePart;

  if (triggeringButton == "button_solution_1") {
    puzzlePart = "puzzle_videoQuestions_1";
    // correctSolution = correctSolution_1;
  }
  else if (triggeringButton == "button_solution_2") {
    puzzlePart = "puzzle_videoQuestions_2";
    // correctSolution = correctSolution_2;
  }
  else if (triggeringButton == "button_solution_3") {
    puzzlePart = "puzzle_videoQuestions_3";
    // correctSolution = correctSolution_3;
  }

  // Was die Spielerin eingegeben hat bei der aktuellen Rätselfrage
  playerSolution = document.forms[puzzlePart]["solution"].value;

  // Was 'true' ergeben muss, damit die Lösung als richtig erkannt Wird
  // playerSolution muss die RegEx-Pattern enthalten
  var correctSolution_1 = ersteAbstimmung.test(playerSolution);
  var correctSolution_2 = baselStadt.test(playerSolution) && waadt.test(playerSolution) && genf.test(playerSolution) && neuenburg.test(playerSolution);
  var correctSolution_3 = unterbaech.test(playerSolution);

  // Welche Rätselfrage kommt nach dieser?
  var nextPuzzlePart;

  // Um welche Lösung geht es aktuell?
  if (puzzlePart == "puzzle_videoQuestions_1") {
    // puzzlePart = "puzzle_videoQuestions_1";
    correctSolution = correctSolution_1;
    nextPuzzlePart = "puzzle_videoQuestions_2";
  }
  else if (puzzlePart == "puzzle_videoQuestions_2") {
    // puzzlePart = "puzzle_videoQuestions_2";
    correctSolution = correctSolution_2;
    nextPuzzlePart = "puzzle_videoQuestions_3";
  }
  else if (puzzlePart == "puzzle_videoQuestions_3") {
    // puzzlePart = "puzzle_videoQuestions_3";
    correctSolution = correctSolution_3;
    nextPuzzlePart = undefined;
  }

  if (correctSolution == true) {
    // alert("Richtig!");
    // Formular bzw. umgebendes div mit der korrekt beantworteten Frage verstecken
    solvedForm = document.getElementById(puzzlePart);
    solvedForm.classList.toggle("display");
    // Zweite Rätselfrage aufrufen
    if (nextPuzzlePart == undefined) {
      location.assign("marsch.html");
    }
    else {
      puzzlePart = nextPuzzlePart;
      startPuzzlePart(puzzlePart);
    }
  }
  else {
    button_startPuzzle.removeEventListener("click", getHint);
    alert_wrongAnswer.classList.toggle("display");
    var puzzleDiv = document.getElementById(puzzlePart);
    puzzleDiv.classList.toggle("display");
    button_alert.addEventListener("click", reDisplayPuzzleWrapper);
  }
}

function setup() {
  // Fernseher und Radio
  tv_gross.addEventListener("click", showTV);
  button_radio_noise.addEventListener("click", function(event) {playSound(rauschen, event.target);});
  button_radio_song.addEventListener("click", function(event) {playSound(radiosong, event.target);});
  // Quizfragen
  button_solution_1.addEventListener("click", function() {checkPuzzle(this);});
  button_solution_2.addEventListener("click", function() {checkPuzzle(this);});
  button_solution_3.addEventListener("click", function() {checkPuzzle(this);});
  zeitungsstapel.addEventListener("click", showPaper);
  document.addEventListener("keypress", preventEnter);
  // zeitungWeg_1.addEventListener("mouseover", function(event) {showArea(event.target)});
  // zeitungWeg_2.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);
