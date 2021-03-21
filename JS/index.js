var start = document.getElementById("start");
var wir = document.getElementById("wir");

function startGame() {
  location.assign("briefing.html");
}

function goWir(){
	window.open('wir.html', '_blank');
}

function setup() {
  start.addEventListener("click", startGame);
  wir.addEventListener("click", goWir);
}

window.addEventListener("load", setup);
