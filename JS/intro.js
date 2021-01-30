// Knöpfe an Fernseher und Radio, um Videos/Song zu starten
var button_lotti = document.getElementById("button_lotti");
var button_unterbaech = document.getElementById("button_unterbaech");
var button_appenzell = document.getElementById("button_appenzell");
var button_radio_noise = document.getElementById("button_radio_noise");
var button_radio_song = document.getElementById("button_radio_song");
var radiosong = document.getElementById("radiosong");
var rauschen = document.getElementById("rauschen");

// grosser Fernseher
var fernseher= document.getElementById("fernseher");
// Fläche des kleinen Fernsehers: Bei Klick darauf erscheint der grosse
var tv_gross = document.getElementById("tv_gross");
// Fläche links und rechts neben Fernseher im Hintergrund -
// Klick lässt grossen Fernseher verschwinden
var area_hideTV_1 = document.getElementById("area_hideTV_1");
var area_hideTV_2 = document.getElementById("area_hideTV_2");
// Schwarzer Hintergrund wegen durchsichtigem Bildschirm
var black = document.getElementById("tv_black");
// var blackIsDisplayed = false;

// Untertitel
var untertitel_lotti = document.getElementById("untertitel_lotti");
var untertitel_unterbaech = document.getElementById("untertitel_unterbaech");
var untertitel_appenzell = document.getElementById("untertitel_appenzell");

// Zustand der Videos - sind sie im Player geladen? Werden sie gerade abgespielt?
var lotti_isPlaying = false;
// var lotti_isLoaded = true;
var unterbaech_isPlaying = false;
// var unterbaech_isLoaded = false;
var appenzell_isPlaying = false;
// var appenzell_isLoaded = false;
var radiosong_isPlaying = false;
var rauschen_isPlaying = false;

// Button "Ich bin informiert", startet das Rätsel zum Video
var button_startPuzzle = document.getElementById("startPuzzle");

// Buttons 'Senden', um die eingegebenen Lösungswörter zu überprüfen
var button_solution_1 = document.getElementById("button_solution_1");
var button_solution_2 = document.getElementById("button_solution_2");
var button_solution_3 = document.getElementById("button_solution_3");

// div mit Rätsel zum Video
var puzzle_videoQuestions = document.getElementById("puzzle_videoQuestions");
// div mit Alert "Falsche Antwort"
var alert_wrongAnswer = document.getElementById("alert_wrongAnswer");
button_alert = document.getElementById("button_alert");

// Rätsel zum Video, Formular mit Fragen und Eingabefeldern
var form_videoQuestions = document.forms["puzzle_videoQuestions"];

// SRF Player wird mit einem ersten Video geladen (Lotti Ruckstuhl)
var player = SRG.PlayerManager.createPlayer('SRF_player','inline','urn:srf:video:9b110c29-9032-4d65-bd8b-e60c39d30e0a&start=535');
var player_isDisplayed = false;

// Intervall, das die aktuelle Abspielsekunde kontrolliert
// Wird von SRF_player-Methoden gestartet und gestoppt
var playbackInterval = undefined;

// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
function showArea(area) {
  area.style.cursor = "pointer";
}

// Grossen Fernseher verstecken
function hideTV() {
  fernseher.classList.toggle("display");
  if (player_isDisplayed) {
    SRF_player.classList.toggle("display");
    player_isDisplayed = false;
  }
  if (black.classList.contains("display")) {
    black.classList.toggle("display");
  }
}

// Grossen Fernseher anzeigen
function showTV() {
  black.classList.toggle("display");
  fernseher.classList.toggle("display");
  area_hideTV_1.addEventListener("click", hideTV);
  area_hideTV_2.addEventListener("click", hideTV);
}

// Objekt, das den Zustand der Videos kennt - sind sie im Player geladen?
var loadState = {
  lotti: true,
  unterbaech: false,
  appenzell: false
}

// Objekt, das den Zustand der Videos kennt - werden sie gerade abgespielt?
var playState = {
  lotti: false,
  unterbaech: false,
  appenzell: false,
}

// Funktion, die eine Closure enthält und die Callback-Funktion für das
// Intervall zurückgibt,
// die an das Video-Objekt gebunden ist (andernfalls wäre sie an
// Window gebunden)
function returnCheckPlaybackTime(obj) {
  return function() {
    player.getCurrentTime(function (currentTime) {
      if (currentTime >= obj.stopTime) {
        obj.pause();
        obj.stopInterval();
        player.seek(obj.startTime);
        playState[obj.name] = false;
      }
    });
  }
}

// Prototyp SRF_Video
function SRF_Video(name, urn, startTime, stopTime, subtitles) {
  // startTime and stopTime in seconds (int or float)
  // var self = this;
  this.name = name;
  this.urn = urn;
  this.startTime = startTime;
  this.stopTime = stopTime;
  this.fullUrn = urn + '&start=' + startTime;
  this.subtitles = subtitles;
}

SRF_Video.prototype = {

  showSubtitles: function() {
    this.subtitles.classList.toggle("display");
  },

  play: function() {
    player.play();
    area_hideTV_1.removeEventListener("click", hideTV);
    area_hideTV_2.removeEventListener("click", hideTV);
    playState[this.name] = true;
    if (player_isDisplayed == false) {
      this.displayPlayer();
    }
    this.subtitles.classList.toggle("display");
    this.startInterval();
    showSubtitles();
    // if (black.classList.contains("display")) {
    //   black.classList.toggle("display");
    // }
  },

  pause: function() {
    player.pause();
    this.showSubtitles();
    playState[this.name] = false;
    area_hideTV_1.addEventListener("click", hideTV);
    area_hideTV_2.addEventListener("click", hideTV);
  },

  recreatePlayer: function() {
    // if (black.classList.contains("display") == false) {
    //   black.classList.toggle("display");
    // }
    this.stopInterval();
    player.destroy();
    this.resetLoadState();
    this.resetPlayState();
    player = SRG.PlayerManager.createPlayer('SRF_player','inline', this.fullUrn);
    loadState[this.name] = true;
  },

  resetLoadState: function() {
    loadState.lotti = false;
    loadState.unterbaech = false;
    loadState.appenzell = false;
  },

  resetPlayState: function() {
    playState.lotti = false;
    playState.unterbaech = false;
    playState.appenzell = false;
  },

  startInterval: function() {
    clearInterval(playbackInterval);
    // Der Variable wird eine Funktion ausserhalb des Objekts zugewiesen,
    // die eine Closure enthält und die Callback-Funktion zurückgibt,
    // die an das Video-Objekt gebunden ist (andernfalls wäre sie an
    // Window gebunden)
    let checkPlaybackTime = returnCheckPlaybackTime(this);
    playbackInterval = setInterval(checkPlaybackTime, 1000);
  },

  stopInterval: function() {
    if (playbackInterval != undefined) {
      clearInterval(playbackInterval);
    }
  },

  displayPlayer: function() {
    SRF_player.classList.toggle("display");
    player_isDisplayed = true;
  },

  handle: function() {
    // Wenn das Video schon geladen ist, Player starten
    if (loadState[this.name] == true) {
      if (playState[this.name] == false) {
        this.play();
      }
      else {
        this.pause();
      }
    }
    // Sonst Video laden
    else {
      this.recreatePlayer();
      this.play();
    }
  },
}


lotti = new SRF_Video('lotti', 'urn:srf:video:9b110c29-9032-4d65-bd8b-e60c39d30e0a', 535, 609, untertitel_lotti);
unterbaech = new SRF_Video('unterbaech', 'urn:srf:video:5daf0760-6a4d-441a-9bf9-0a1cb9cb511a', 1045.9, 1062.5, untertitel_unterbaech);
appenzell = new SRF_Video('appenzell', 'urn:srf:video:ad22fde5-2351-4d18-9cf2-9954c194d3a3', 0, 53, untertitel_appenzell);

// Funktion, die alle evtl. laufende Radiosounds vorsorglich stoppt
function stopRadio() {
  radiosong.pause();
  rauschen.pause();
}

// Funktion, die den Radio-Song abspielt
function playSound(sound) {
  if (sound.paused == false) {
    sound.pause();
  }
  else {
    stopRadio();
    sound.play();
  }
}

// Funktion, die das Default Behaviour der Enter-Taste
// (Formular abschicken mit POST) verhindert
function preventEnter(event) {
  if (event.key == "Enter"){
    event.preventDefault();
    // alert("Enter key was pressed!");
  }
}

// Wrapper-Funktion, da von Event-Listener aufgerufen
function startPuzzle() {
  startPuzzlePart("puzzle_videoQuestions_1");
}

function startPuzzlePart(puzzlePart) {
  // Div mit Rätselfrage anzeigen
  var puzzleDiv = document.getElementById(puzzlePart);
  puzzleDiv.classList.toggle("display");
  // puzzleDiv.querySelector("form").focus(); //not working yet
  document.addEventListener("keypress", function(event) {preventEnter(event);})
}

// Rätselfrage nach falscher Antwort erneut anzeigen
function reDisplayPuzzlePart(puzzleDiv) {
  alert_wrongAnswer.classList.toggle("display");
  puzzleDiv.classList.toggle("display");
  button_alert.addEventListener("click", function() {reDisplayPuzzlePart(puzzleDiv);});
}

function checkPuzzle(trigger) {

  // Was die Spielerin eingegeben hat
  var playerSolution;

  // Welcher Button hat die Funktion getriggert (id des HTML-Elements)?
  var triggeringButton = trigger.id;

  // Die Lösungsbausteine als RegEx-Muster
  // solution_1
  ersteAbstimmung = /1959/;

  // Die Lösungsbausteine als RegEx-Muster
  // solution_2
  baselStadt = /(basel[-\s]stadt|bs)/i;
  waadt = /(waadt|vaud|vd)/i;
  genf = /(genf|gen[eéè]ve|ge)/i;
  neuenburg = /(neuenburg|neuch[aâ]tel|ne)/i;

  // Die Lösungsbausteine als RegEx-Muster
  // solution_3
  unterbaech = /unterb[aä]e?ch/i;

  // Um welche Rätselfrage (welches Formular-HTML-Element)
  // geht es aktuell?
  var puzzlePart;

  if (triggeringButton == "button_solution_1") {
    puzzlePart = "puzzle_videoQuestions_1";
    // correctSolution = correctSolution_1;
  }
  else if (triggeringButton == "button_solution_2") {
    puzzlePart = "puzzle_videoQuestions_2";
    // correctSolution = correctSolution_2;
  }
  else if (triggeringButton == "button_solution_3") {
    puzzlePart = "puzzle_videoQuestions_3";
    // correctSolution = correctSolution_3;
  }

  // Was die Spielerin eingegeben hat bei der aktuellen Rätselfrage
  playerSolution = document.forms[puzzlePart]["solution"].value;

  // Was 'true' ergeben muss, damit die Lösung als richtig erkannt Wird
  // playerSolution muss die RegEx-Pattern enthalten
  var correctSolution_1 = ersteAbstimmung.test(playerSolution);
  var correctSolution_2 = baselStadt.test(playerSolution) && waadt.test(playerSolution) && genf.test(playerSolution) && neuenburg.test(playerSolution);
  var correctSolution_3 = unterbaech.test(playerSolution);

  // Welche Rätselfrage kommt nach dieser?
  var nextPuzzlePart;

  // Um welche Lösung geht es aktuell?
  if (puzzlePart == "puzzle_videoQuestions_1") {
    // puzzlePart = "puzzle_videoQuestions_1";
    correctSolution = correctSolution_1;
    nextPuzzlePart = "puzzle_videoQuestions_2";
  }
  else if (puzzlePart == "puzzle_videoQuestions_2") {
    // puzzlePart = "puzzle_videoQuestions_2";
    correctSolution = correctSolution_2;
    nextPuzzlePart = "puzzle_videoQuestions_3";
  }
  else if (puzzlePart == "puzzle_videoQuestions_3") {
    // puzzlePart = "puzzle_videoQuestions_3";
    correctSolution = correctSolution_3;
    nextPuzzlePart = undefined;
  }

  if (correctSolution == true) {
    // alert("Richtig!");
    // Formular bzw. umgebendes div mit der korrekt beantworteten Frage verstecken
    solvedForm = document.getElementById(puzzlePart);
    solvedForm.classList.toggle("display");
    // Zweite Rätselfrage aufrufen
    if (nextPuzzlePart == undefined) {
      alert("Vreni, Lisi und Ruth kommen ins Wohnzimmer für die nächste Station");
    }
    else {
      startPuzzlePart(nextPuzzlePart);
    }
  }
  else {
    alert_wrongAnswer.classList.toggle("display");
    var puzzleDiv = document.getElementById(puzzlePart);
    puzzleDiv.classList.toggle("display");
    button_alert.addEventListener("click", function() {reDisplayPuzzlePart(puzzleDiv);});
  }
}

function setup() {
  // Fernseher und Radio
  tv_gross.addEventListener("click", showTV);
  button_lotti.addEventListener("click", lotti.handle.bind(lotti));
  button_unterbaech.addEventListener("click", unterbaech.handle.bind(unterbaech));
  button_appenzell.addEventListener("click", appenzell.handle.bind(appenzell));
  button_startPuzzle.addEventListener("click", startPuzzle);
  button_radio_noise.addEventListener("click", function() {playSound(rauschen);});
  button_radio_song.addEventListener("click", function() {playSound(radiosong);});
  // Quizfragen
  button_solution_1.addEventListener("click", function() {checkPuzzle(this);});
  button_solution_2.addEventListener("click", function() {checkPuzzle(this);});
  button_solution_3.addEventListener("click", function() {checkPuzzle(this);});
  // tv_gross.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);
