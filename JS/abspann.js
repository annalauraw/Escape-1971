var song = document.getElementById("song");
var button_animation = document.getElementById("animation");
var content = document.getElementsByClassName("imagecontainer")[0];
var button_song = document.getElementById("button_song");

function startAnimation() {
  song.play();
  content.classList.toggle("animate");
}

function setup() {
  button_animation.addEventListener("click", startAnimation);
}

window.addEventListener("load", setup);
