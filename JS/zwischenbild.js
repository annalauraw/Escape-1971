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


// Nur das erste Abspielen - Buttons sind noch versteckt
function playBriefing() {
  document.getElementById("ton").play();
  document.getElementById("ton").addEventListener("ended", function (){
		location.assign("wecker_1.html");
	});
  startInterval();
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