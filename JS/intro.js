// Knopf an Fernseher, um Testvideo zu starten
var button_lotti = document.getElementById("button_lotti");
// div, das den SRF Player enthält
var SRF_player = document.getElementById("SRF_player");
var testvideo_2 = document.getElementById("testvideo_2");
var lotti_isDisplayed = false;
var lotti_isPlaying = false;
var testvideo_2_isDisplayed = false;
var testvideo_2_isPlaying = false;
// Button "Ich bin informiert", startet das Rätsel zum Video
var button_startPuzzle = document.getElementById("startPuzzle");
// div mit Rätsel zum Video
var puzzle_videoQuestions = document.getElementById("puzzle_videoQuestions");
// Rätsel zum Video, Formular mit Fragen und Eingabefeldern
var form_videoQuestions = document.forms["puzzle_videoQuestions"];
// SRF Player wird mit einem ersten Video geladen (Lotti Ruckstuhl)
var player = SRG.PlayerManager.createPlayer('SRF_player','inline','urn:srf:video:9b110c29-9032-4d65-bd8b-e60c39d30e0a&start=535');

// Wenn der oberste Knopf am Fernseher geklickt wird, wird
// das Testvideo gestartet

// Testfunktion, um die Image map zu sehen (wo ist der klickbare Kreis?)
// function hoverOverButton() {
//   button_testvideo_2.style.cursor = "pointer";
// }

// Die Funktionen playLotti und playTestvideo_2 schreien
// nach einer Klasse

function playLotti() {
  //testvideo_2 ggf. stoppen und verstecken
  if (testvideo_2_isPlaying == true) {
    testvideo_2.pause();
    testvideo_2_isPlaying = false;
  }
  if (testvideo_2_isDisplayed == true) {
    testvideo_2.classList.toggle("display");
    testvideo_2_isDisplayed = false;
  }
  //lotti ggf. anzeigen und starten
  if (lotti_isDisplayed == false) {
    SRF_player.classList.toggle("display");
    lotti_isDisplayed = true;
  }
  if (lotti_isPlaying == false) {
    // console.log(player.isReady());
    player.play();
    lotti_isPlaying = true;
  }
  else {
    player.pause();
    lotti_isPlaying = false;
  }
}

function playTestvideo_2() {
  //testvideo_1 ggf. stoppen und verstecken
  if (lotti_isPlaying == true) {
    SRF_player.pause();
    lotti_isPlaying = false;
  }
  if (lotti_isDisplayed == true) {
    SRF_player.classList.toggle("display");
    lotti_isDisplayed = false;
  }
  //testvideo_2 ggf. anzeigen und starten
  if (testvideo_2_isDisplayed == false) {
    testvideo_2.classList.toggle("display");
    testvideo_2_isDisplayed = true;
  }
  if (testvideo_2_isPlaying == false) {
    testvideo_2.play();
    testvideo_2_isPlaying = true;
  }
  else {
    testvideo_2.pause();
    testvideo_2_isPlaying = false;
  }
}

function startPuzzle() {
  puzzle_videoQuestions.classList.toggle("display");
}

function checkPuzzle() {
  // Was die Spielerin eingegeben hat
  var solution1 = document.forms["puzzle_videoQuestions"]["solution1"].value;
  var solution2 = document.forms["puzzle_videoQuestions"]["solution2"].value;
  var solution3 = document.forms["puzzle_videoQuestions"]["solution3"].value;
  // Hier evtl mit RegEx arbeiten, damit Varianten als richtig erkannt werden
  if (solution1 == "1953" && solution2 == "Waadt, Genf" && solution3 == "Unterbäch") {
    window.alert("Glückwunsch! Diese Antworten sind richtig!");
  }
}

function setup() {
  button_lotti.addEventListener("click", playLotti);
  button_testvideo_2.addEventListener("click", playTestvideo_2);
  button_startPuzzle.addEventListener("click", startPuzzle);
  form_videoQuestions.addEventListener("submit", checkPuzzle);
  // button_testvideo_2.addEventListener("mouseover", hoverOverButton);
}

window.addEventListener("load", setup);
