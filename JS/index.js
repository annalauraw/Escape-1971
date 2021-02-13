var start = document.getElementById("start");

function startGame() {
  location.assign("briefing.html");
}

function setup() {
  start.addEventListener("click", startGame);
}

window.addEventListener("load", setup);
