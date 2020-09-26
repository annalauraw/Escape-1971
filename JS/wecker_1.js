const RUTH = document.getElementById("ruth");

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
    // console.log(posLeftString);
  }
  if (event.key == "a") {
    posLeft -= 20;
    posLeftString = posLeft.toString() + "px";
    //The above statement does not update the left value in the document yet
    document.getElementById("ruth").style.left = posLeft.toString() + "px";
    // console.log(posLeftString);
  }
  if (event.key == "w") {
    posBottom += 20;
    posBottomString = posBottom.toString() + "px";
    //The above statement does not update the bottom value in the document yet
    document.getElementById("ruth").style.bottom = posBottom.toString() + "px";
    // console.log(posLeftString);
  }
  if (event.key == "s") {
    posBottom -= 20;
    posBottomString = posBottom.toString() + "px";
    //The above statement does not update the bottom value in the document yet
    document.getElementById("ruth").style.bottom = posBottom.toString() + "px";
    // console.log(posLeftString);
  }
}

function setup(){
  document.addEventListener("keypress", function(event){moveRuth(event)});
}

window.addEventListener("load", setup);
