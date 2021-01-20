var briefing = document.getElementById("briefing");
var ruth = document.getElementById("ruth");
var repeat = document.getElementById("repeat");
var next = document.getElementById("next");

function repeatBriefing() {
  briefing.play();
  // Buttons bleiben angezeigt
}

// Gehe zur nächsten Station: Ruths Wohnzimmer
function nextStation() {
  location.assign("intro.html");
}

function showButtons() {
  repeat.classList.toggle("display");
  next.classList.toggle("display");
  repeat.addEventListener("click", repeatBriefing);
  next.addEventListener("click", nextStation)
}

// Nur das erste Abspielen - Buttons sind noch versteckt
function playBriefing() {
  briefing.play();
  briefing.addEventListener("ended", showButtons);
  ruth.removeEventListener("click", playBriefing);
}

function setup() {
  ruth.addEventListener("click", playBriefing);
}

window.addEventListener("load", setup);
