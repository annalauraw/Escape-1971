
var button_feedback = document.getElementById("button_feedback");
var button_back = document.getElementById("button_back");

function openFeedbackForm() {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLScuSnXfaIAFTQ_m5FXLmjfz_UJCuODYZNtcckv6M_nAot5h5w/viewform?usp=sf_link', '_blank');
}
function goBack(){
	location.assign("index.html");
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
  button_feedback.addEventListener("click", openFeedbackForm);
  button_back.addEventListener("click", goBack);
  document.addEventListener("keypress", preventEnter);
}




window.addEventListener("load", setup);
