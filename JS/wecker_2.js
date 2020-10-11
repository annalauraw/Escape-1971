function showPuzzle() {
  var puzzle1 = document.getElementById("puzzle1");
  puzzle1.classList.toggle("display");
  // document.removeEventListener("keypress", function(event){moveRuth(event)});
}

function checkPuzzle1() {
  var solution1 = document.forms["puzzle1"]["solution1"].value;
  if (solution1 == "1937") {
    window.alert("Glückwunsch! Diese Antwort ist richtig!");
  }
}

// function setup() {
//   document.addEventListener([myEvent], [myFunction]);
// }

// window.addEventListener("load", setup);
