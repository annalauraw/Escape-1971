var song = document.getElementById("song");
// var besensolo = document.getElementById("besensolo");
var content = document.getElementsByClassName("imagecontainer")[0];
var buttons_top = document.getElementById("buttons_top");
var button_song = document.getElementById("button_song");
var button_feedback = document.getElementById("button_feedback");
var button_wir = document.getElementById("wir");
var imagecontainer = document.getElementsByClassName("imagecontainer")[0];
var arrow = document.getElementById("arrowDown");

function openFeedbackForm() {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLScuSnXfaIAFTQ_m5FXLmjfz_UJCuODYZNtcckv6M_nAot5h5w/viewform?usp=sf_link', '_blank');
}

function goWir() {
	window.open('wir.html', '_blank');
}

function backToStart() {
  setTimeout(function() {
    content.classList.toggle("end");
    content.removeEventListener("animationend", backToStart);
    content.removeEventListener("webkitAnimationEnd", backToStart);
    buttons_top.classList.toggle("display");
    button_feedback.addEventListener("click", openFeedbackForm);
	button_wir.addEventListener("click", goWir);
  }, 1000);
}

function startAnimation() {
  arrow.classList.toggle("display");
  window.removeEventListener("click", startAnimation);
  imagecontainer.style.top = "0";
  setTimeout(function() {
    song.play();
    // song.addEventListener("ended", function() {besensolo.play();});
    content.classList.toggle("animate");
    content.addEventListener("animationend", backToStart);
    content.addEventListener("webkitAnimationEnd", backToStart);
  }, 300);
}

// Funktion, die das Default Behaviour der Enter-Taste
// (Formular abschicken mit POST) verhindert
// Ebenso das Default Behaviour der Backspace-Taste
// (zurück zur letzten Seite)
function preventEnter(event) {
  if (event.key == "Enter" || (event.keyCode == 8 && event.target == document.body)){
    event.preventDefault();
    // alert("Enter key was pressed!");
  }
}

function setup() {
  window.addEventListener("click", startAnimation);
  arrowTopPosition = window.innerHeight - 150;
  arrowDown.style.top = arrowTopPosition.toString() + "px";
  document.addEventListener("keypress", preventEnter);
}



window.addEventListener("load", setup);
