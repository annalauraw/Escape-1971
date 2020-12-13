// Knopf an Fernseher, um Testvideo zu starten
var button_lotti = document.getElementById("button_lotti");
var lotti = document.getElementById("lotti");
var testvideo_2 = document.getElementById("testvideo_2");
var lotti_isDisplayed = false;
var lotti_isPlaying = false;
var testvideo_2_isDisplayed = false;
var testvideo_2_isPlaying = false;


// Wenn der oberste Knopf am Fernseher geklickt wird, wird
// das Testvideo gestartet

// Testfunktion, um die Image map zu sehen (wo ist der klickbare Kreis?)
function hoverOverButton() {
  button_testvideo_2.style.cursor = "pointer";
}

// Die Funktionen playTestvideo_1 und playTestvideo_2 schreien
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
    lotti.classList.toggle("display");
    lotti_isDisplayed = true;
  }
  if (lotti_isPlaying == false) {
    lotti.play();
    lotti_isPlaying = true;
  }
  else {
    lotti.pause();
    lotti_isPlaying = false;
  }
}

function playTestvideo_2() {
  //testvideo_1 ggf. stoppen und verstecken
  if (lotti_isPlaying == true) {
    lotti.pause();
    lotti_isPlaying = false;
  }
  if (lotti_isDisplayed == true) {
    lotti.classList.toggle("display");
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

function setup() {
  button_lotti.addEventListener("click", playLotti);
  button_testvideo_2.addEventListener("click", playTestvideo_2);
  // button_testvideo_2.addEventListener("mouseover", hoverOverButton);
}

window.addEventListener("load", setup);
