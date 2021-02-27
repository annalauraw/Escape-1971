// const: Konstanten --> Wert darf nicht verändert werden
// RUTH: das sich bewegende Ruth-Bild
const RUTH = document.getElementById("ruth");
// IMAGE: das Hintergrundbild
const IMAGE = document.getElementsByClassName("imagecontainer")[0];
// Soundtrack: erster Durchlauf mit Intro
const BIT_TUNE = document.getElementById("8bit");
// Soundtrack: Loop ohne Intro
const BIT_TUNE_LOOP = document.getElementById("8bit_loop");
// Button, der zuerst der Startbutton ist
var button_hilfe = document.getElementById("button_hilfe");
// Button, um vom Tip zurück zum Rätsel zu kommen
var button_zurueck_1 = document.getElementById("button_zurueck_1");
// Button, um das Bild vom Nationalratssaal anzuzeigen
var button_bild = document.getElementById("button_bild");
// div mit Tip
var hilfe = document.getElementById("hilfe");
// Bild vom Nationalratssaal
var nationalratssaal = document.getElementById("nationalratssaal");
// Button, um vom Nationalratssaal wieder zurück zu kommen
var button_zurueck_2 = document.getElementById("button_zurueck_2");

// Variablen für den Timer
const TIMER = document.getElementById("timer");
var seconds;
var timerInterval;

// Variablen für den addEventListener
var posLeftString = RUTH.style.left;
var posBottomString = RUTH.style.bottom;
var posLeft = Number(posLeftString.slice(0, -2));
var posBottom = Number(posBottomString.slice(0, -2));

// Abspielen des Soundtracks beim Start
function startSoundtrack() {
  BIT_TUNE.play();
}

// Funktion, die Ruth an den Anfang des Wegs zurücksetzt
function resetRuth() {
  RUTH.style.left = "120px";
  RUTH.style.bottom = "40px";
  posLeft = 120;
  posBottom = 40;
}

// Timer zählt Countdown ab 10
function countTimer() {
  if (seconds >= 1) {
    seconds -= 1;
    TIMER.innerHTML = seconds.toString();
  }
  else {
    clearInterval(timerInterval);
    resetRuth();
    TIMER.classList.toggle("display");
    startTimer();
  }
}

// Funktion, die den Timer startet
function startTimer() {
  seconds = 7;
  TIMER.innerHTML = seconds.toString();
  TIMER.classList.toggle("display");
  timerInterval = setInterval(countTimer, 1000);
}

function startGame() {
  IMAGE.removeEventListener("click", startGame);
  document.addEventListener("keypress", function(event){moveRuth(event)});
  document.addEventListener("keypress", checkRuthPosition);
  startSoundtrack();
  startTimer();
}

// Soundtrack stoppen / starten, wenn Button gedrückt wird
// function toggleSoundtrack() {
//   if (BIT_TUNE_LOOP.paused) {
//     BIT_TUNE_LOOP.play();
//     START.innerHTML = "Sound stoppen";
//   }
//   else {
//     BIT_TUNE_LOOP.pause();
//     START.innerHTML = "Sound starten";
//   }
// }

function startSoundtrackLoop() {
  BIT_TUNE_LOOP.play();
  // if (START.innerHTML == "Start") {
  //   START.innerHTML = "Sound stoppen";
  //   START.addEventListener("click", toggleSoundtrack);
  // }
}

function moveRuth(event) {
  // console.log(event.key);


  // Wenn d-Taste gedrückt wird, läuft Ruth 20px nach rechts
  if (event.key == "d") {
    // bei 760px kann Ruth nicht weiter nach rechts
    // wenn sie weiter unten als 340px ist (unterer Weg)
    if (posBottom <= 340) {
      if (posLeft <= 760) {
        posLeft += 20;
        // console.log(posLeft);
        posLeftString = posLeft.toString() + "px";
        RUTH.style.left = posLeft.toString() + "px";
        // console.log("left", posLeftString);
      }
    }
    else if (posLeft <= 1000) {
      if (posBottom > 340 && posBottom <= 380) {
        posLeft += 20;
        // console.log(posLeft);
        posLeftString = posLeft.toString() + "px";
        //The above statement does not update the left value in the document yet
        RUTH.style.left = posLeft.toString() + "px";
      }
    }
  }
  // Wenn a-Taste gedrückt wird, läuft Ruth 20px nach links
  else if (event.key == "a") {
    // bei 120px kann Ruth nicht weiter nach links
    // wenn sie weiter unten als 340px ist (unterer Weg)
    if (posBottom == 40) {
      if (posLeft >= 140) {
        posLeft -= 20;
        // console.log(posLeft);
        posLeftString = posLeft.toString() + "px";
        RUTH.style.left = posLeft.toString() + "px";
      }
    }
    else if (posBottom >= 360 && posBottom <= 380) {
      if (posLeft >= 220) {
        posLeft -= 20;
        // console.log(posLeft);
        posLeftString = posLeft.toString() + "px";
        RUTH.style.left = posLeft.toString() + "px";
      }
    }
  }
  // Wenn w-Taste gedrückt wird, läuft Ruth 20px nach oben
  else if (event.key == "w") {
    // wenn Ruth beim Weg nach oben ist
    // && posBottom <= 360
    if (posLeft >= 740 && posLeft <= 780 && posBottom <= 360) {
      posBottom += 20;
      // console.log(posBottom);
      posBottomString = posBottom.toString() + "px";
      RUTH.style.bottom = posBottom.toString() + "px";
      console.log("bottom", posBottomString);
    }
    // wenn Ruth vor einem der Häuser ist
    else if (posBottom >= 360 && posBottom <= 460) {
      if (posLeft == 1020 || posLeft == 580 || posLeft == 200) {
        posBottom += 20;
        console.log(posBottom);
        posBottomString = posBottom.toString() + "px";
        RUTH.style.bottom = posBottom.toString() + "px";
      }
    }
  }
  // Wenn s-Taste gedrückt wird, läuft Ruth 20px nach unten
  else if (event.key == "s") {
    // wenn sie auf dem langen senkrechten Weg ist
    if (posLeft >= 740 && posLeft <= 780 && posBottom >= 60) {
      posBottom -= 20;
      console.log(posBottom);
      posBottomString = posBottom.toString() + "px";
      RUTH.style.bottom = posBottom.toString() + "px";
    }
    // wenn sie vor einem der Häuser steht
    else if ((posLeft == 1020 || posLeft == 580 || posLeft == 200) && posBottom >= 400) {
      posBottom -= 20;
      console.log(posBottom);
      posBottomString = posBottom.toString() + "px";
      RUTH.style.bottom = posBottom.toString() + "px";
    }
  }
}

// Wenn Ruth in Uelis Tür steht, betritt sie sein Schlafzimmer
function checkRuthPosition() {
  if (posLeft == 1020 && posBottom == 460) {
    // Call next HTML page
    location.assign("vordertuere.html");
  }
}

// Nach dem Tip: zurück zum Rätsel
function backToPuzzle(e) {
  if (hilfe.classList.contains("display")) {
    hilfe.classList.toggle("display");
  }
  if (e.target.id == "button_zurueck_1") {
    button_zurueck_1.removeEventListener("click", backToPuzzle);
  }
  else if (e.target.id == "button_zurueck_2") {
    button_zurueck_2.removeEventListener("click", backToPuzzle);
    button_zurueck_2.classList.toggle("display");
    nationalratssaal.classList.toggle("display");
  }
}

// Bild vom Nationalratssaal zeigen
function showPicture() {
  button_bild.removeEventListener("click", showPicture);
  nationalratssaal.classList.toggle("display");
  button_zurueck_2.classList.toggle("display");
  button_zurueck_2.addEventListener("click", backToPuzzle);
}

// Wenn der Hilfe-Button geklickt wird
function getHelp() {
  hilfe.classList.toggle("display");
  button_zurueck_1.addEventListener("click", backToPuzzle);
  button_bild.addEventListener("click", showPicture);
}

// Diese Funktion registriert einen Event-Listener für das gesamte HTML-Dokument
// Sobald eine Taste gedrück wird, wird die Funktion moveRuth() aufgerufen
//Als Parameter wird der keypress-Event mitgeliefert, der die Info enthält,
//welche Taste gedrückt wurde
function setup() {
  BIT_TUNE.addEventListener("ended", startSoundtrackLoop);
  // BIT_TUNE.addEventListener("ended", showButton);
  BIT_TUNE_LOOP.addEventListener("ended", startSoundtrackLoop);
  IMAGE.addEventListener("click", startGame);
  button_hilfe.addEventListener("click", getHelp);
}

// Sobald die Seite geladen ist, wird die setup-Funktion aufgerufen
window.addEventListener("load", setup);
