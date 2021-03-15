var start = document.getElementById("start");
var wir = document.getElementById("wir");

function startGame() {
  location.assign("briefing.html");
}

function goWir(){
	location.assign("wir.html");
}

function setup() {
  start.addEventListener("click", startGame);
  wir.addEventListener("click", goWir);
}

window.addEventListener("load", setup);
