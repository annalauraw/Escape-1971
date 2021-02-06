var song = document.getElementById("song");
var button_animation = document.getElementById("animation");
var content = document.getElementsByClassName("imagecontainer")[0];
var button_song = document.getElementById("button_song");

function backToStart() {
  setTimeout(function() {
    content.classList.toggle("end");
    content.removeEventListener("animationend", backToStart);
    content.removeEventListener("webkitAnimationEnd", backToStart);
  }, 3000);
}

function startAnimation() {
  song.play();
  content.classList.toggle("animate");
  content.addEventListener("animationend", backToStart);
  content.addEventListener("webkitAnimationEnd", backToStart);
}

function setup() {
  button_animation.addEventListener("click", startAnimation);
}

window.addEventListener("load", setup);
