// const: Konstanten --> Wert darf nicht verändert werden
// RUTH: das sich bewegende Ruth-Bild
const RUTH = document.getElementById("ruth");
// IMAGE: das Hintergrundbild
const IMAGE = document.getElementsByClassName("imagecontainer")[0];

function moveRuth(event) {
  // console.log(event.key);
  var posLeftString = RUTH.style.left;
  var posBottomString = RUTH.style.bottom;
  var posLeft = Number(posLeftString.slice(0, -2));
  var posBottom = Number(posBottomString.slice(0, -2));

  // Wenn d-Taste gedrückt wird, läuft Ruth 20px nach rechts
  if (event.key == "d") {
    posLeft += 20;
    posLeftString = posLeft.toString() + "px";
    //The above statement does not update the left value in the document yet
    document.getElementById("ruth").style.left = posLeft.toString() + "px";
    // console.log("left", posLeftString);
  }
  // Wenn a-Taste gedrückt wird, läuft Ruth 20px nach links
  else if (event.key == "a") {
    posLeft -= 20;
    posLeftString = posLeft.toString() + "px";
    //The above statement does not update the left value in the document yet
    document.getElementById("ruth").style.left = posLeft.toString() + "px";
    // console.log("left:", posLeftString);
  }
  // Wenn w-Taste gedrückt wird, läuft Ruth 20px nach oben
  else if (event.key == "w") {
    posBottom += 20;
    posBottomString = posBottom.toString() + "px";
    //The above statement does not update the bottom value in the document yet
    document.getElementById("ruth").style.bottom = posBottom.toString() + "px";
    // console.log("bottom", posBottomString);
  }
  // Wenn s-Taste gedrückt wird, läuft Ruth 20px nach unten
  else if (event.key == "s") {
    posBottom -= 20;
    posBottomString = posBottom.toString() + "px";
    document.getElementById("ruth").style.bottom = posBottom.toString() + "px";
    // console.log("bottom", posBottomString);
  }
  //Wenn Ruth genau vor Uelis Tür steht, geht sie in Uelis Zimmer hinein
  if (posLeft == 1020 && posBottom == 460) {
    // Call next HTML page
    location.assign("wecker_2.html")
  }
}

// Diese Funktion registriert einen Event-Listener für das gesamte HTML-Dokument
// Sobald eine Taste gedrück wird, wird die Funktion moveRuth() aufgerufen
//Als Parameter wird der keypress-Event mitgeliefert, der die Info enthält,
//welche Taste gedrück wurde
function setup() {
  document.addEventListener("keypress", function(event){moveRuth(event)});
}

// Sobald die Seite geladen ist, wird die setup-Funktion aufgerufen
window.addEventListener("load", setup);

// AJAX-Beispiel - falls wir das mal brauchen
// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     IMAGE.innerHTML = this.responseText;
//   }
// };
// xhttp.open("GET", "wecker_2.html", true);
// xhttp.send();
