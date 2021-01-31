var briefing = document.getElementById("briefing");
var ruth = document.getElementById("ruth");
var mund = document.getElementById("mund");
var repeat = document.getElementById("repeat");
var next = document.getElementById("next");
var mouthInterval = undefined;

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

function stopBriefing() {
  briefing.pause();
  pauseInterval();
  repeat.removeEventListener("click", stopBriefing);
  repeat.innerHTML = "Nochmal hören";
  repeat.addEventListener("click", repeatBriefing);
}

function repeatBriefing() {
  briefing.play();
  startInterval();
  repeat.removeEventListener("click", repeatBriefing);
  repeat.innerHTML = "Stop";
  repeat.addEventListener("click", stopBriefing);
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
  startInterval();
  briefing.addEventListener("ended", showButtons);
  briefing.addEventListener("ended", pauseInterval);
  ruth.removeEventListener("click", playBriefing);
}

// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
function showArea(area) {
  area.style.cursor = "pointer";
}

function setup() {
  ruth.addEventListener("click", playBriefing);
  // ruth.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);
