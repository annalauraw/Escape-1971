
var button_feedback = document.getElementById("button_feedback");
var button_back = document.getElementById("button_back");

function openFeedbackForm() {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLScuSnXfaIAFTQ_m5FXLmjfz_UJCuODYZNtcckv6M_nAot5h5w/viewform?usp=sf_link', '_blank');
}
function goBack(){
	location.assign("index.html");
}

function setup() {
  button_feedback.addEventListener("click", openFeedbackForm);
  button_back.addEventListener("click", goBack);
}




window.addEventListener("load", setup);
