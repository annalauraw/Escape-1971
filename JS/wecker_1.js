const RUTH = document.getElementById("ruth");
const IMAGE = document.getElementsByClassName("imagecontainer")[0];

function moveRuth(event) {
  // console.log(event.key);
  var posLeftString = RUTH.style.left;
  var posBottomString = RUTH.style.bottom;
  var posLeft = Number(posLeftString.slice(0, -2));
  var posBottom = Number(posBottomString.slice(0, -2));

  if (event.key == "d") {
    posLeft += 20;
    posLeftString = posLeft.toString() + "px";
    //The above statement does not update the left value in the document yet
    document.getElementById("ruth").style.left = posLeft.toString() + "px";
    console.log("left", posLeftString);
  }
  else if (event.key == "a") {
    posLeft -= 20;
    posLeftString = posLeft.toString() + "px";
    //The above statement does not update the left value in the document yet
    document.getElementById("ruth").style.left = posLeft.toString() + "px";
    console.log("left:", posLeftString);
  }
  else if (event.key == "w") {
    posBottom += 20;
    posBottomString = posBottom.toString() + "px";
    //The above statement does not update the bottom value in the document yet
    document.getElementById("ruth").style.bottom = posBottom.toString() + "px";
    console.log("bottom", posBottomString);
  }
  else if (event.key == "s") {
    posBottom -= 20;
    posBottomString = posBottom.toString() + "px";
    //The above statement does not update the bottom value in the document yet
    document.getElementById("ruth").style.bottom = posBottom.toString() + "px";
    console.log("bottom", posBottomString);
  }
  //Wenn Ruth genau vor Uelis Tür steht, geht sie in Uelis Zimmer hinein
  //To Do: Prüfen, ob dies eine sinnvolle Herangehensweise ist (mit innerHTML)
  //Stattdessen neue HTML-Seite mit eigenem CSS/JS aufrufen?
  if (posLeft == 1020 && posBottom == 460) {
    // Call next HTML page
    location.assign("http://escape.localhost:8080/wecker_2.html")
  }
}

function setup() {
  document.addEventListener("keypress", function(event){moveRuth(event)});
}

window.addEventListener("load", setup);

// AJAX example in case we need it
// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     IMAGE.innerHTML = this.responseText;
//   }
// };
// xhttp.open("GET", "wecker_2.html", true);
// xhttp.send();
