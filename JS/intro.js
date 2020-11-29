// Knopf an Fernseher, um Testvideo zu starten
var button_testvideo_1 = document.getElementById("button_testvideo_1");
var testvideo_1 = document.getElementById("testvideo_1");
var testvideo_2 = document.getElementById("testvideo_2");
var testvideo_1_isDisplayed = false;
var testvideo_1_isPlaying = false;
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

function playTestvideo_1() {
  //testvideo_2 ggf. stoppen und verstecken
  if (testvideo_2_isPlaying == true) {
    testvideo_2.pause();
    testvideo_2_isPlaying = false;
  }
  if (testvideo_2_isDisplayed == true) {
    testvideo_2.classList.toggle("display");
    testvideo_2_isDisplayed = false;
  }
  //testvideo_1 ggf. anzeigen und starten
  if (testvideo_1_isDisplayed == false) {
    testvideo_1.classList.toggle("display");
    testvideo_1_isDisplayed = true;
  }
  if (testvideo_1_isPlaying == false) {
    testvideo_1.play();
    testvideo_1_isPlaying = true;
  }
  else {
    testvideo_1.pause();
    testvideo_1_isPlaying = false;
  }
}

function playTestvideo_2() {
  //testvideo_1 ggf. stoppen und verstecken
  if (testvideo_1_isPlaying == true) {
    testvideo_1.pause();
    testvideo_1_isPlaying = false;
  }
  if (testvideo_1_isDisplayed == true) {
    testvideo_1.classList.toggle("display");
    testvideo_1_isDisplayed = false;
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
  button_testvideo_1.addEventListener("click", playTestvideo_1);
  button_testvideo_2.addEventListener("click", playTestvideo_2);
  // button_testvideo_2.addEventListener("mouseover", hoverOverButton);
}

window.addEventListener("load", setup);
