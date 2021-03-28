var hintergrund=document.getElementById("hintergrund");

function klopfen (){
	document.getElementById("AV-klopfen").play();
	document.getElementById("AV-klopfen").addEventListener("ended", function (){
		location.assign("wecker_2.html");
	});
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
    setTimeout(function() {
    hintergrund.addEventListener("click",klopfen);
     }, 4000); 
	document.addEventListener("keypress", preventEnter);
}

window.addEventListener("load", setup);
