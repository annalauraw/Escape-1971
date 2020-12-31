// Knöpfe an Fernseher, um Videos zu starten
var button_lotti = document.getElementById("button_lotti");
var button_unterbaech = document.getElementById("button_unterbaech");
var button_appenzell = document.getElementById("button_appenzell");

// Zustand der Videos - sind sie im Player geladen? Werden sie gerade abgespielt?
var lotti_isPlaying = false;
// var lotti_isLoaded = true;
var unterbaech_isPlaying = false;
// var unterbaech_isLoaded = false;
var appenzell_isPlaying = false;
// var appenzell_isLoaded = false;

// Button "Ich bin informiert", startet das Rätsel zum Video
var button_startPuzzle = document.getElementById("startPuzzle");

// div mit Rätsel zum Video
var puzzle_videoQuestions = document.getElementById("puzzle_videoQuestions");

// Rätsel zum Video, Formular mit Fragen und Eingabefeldern
var form_videoQuestions = document.forms["puzzle_videoQuestions"];

// SRF Player wird mit einem ersten Video geladen (Lotti Ruckstuhl)
var player = SRG.PlayerManager.createPlayer('SRF_player','inline','urn:srf:video:9b110c29-9032-4d65-bd8b-e60c39d30e0a&start=535');
var player_isDisplayed = false;

// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
// function hoverOverButton() {
//   button_appenzell.style.cursor = "pointer";
// }

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
  appenzell: false
}

// Prototyp SRF_Video
function SRF_Video(name, urn, startTime, stopTime) {
  // startTime and stopTime in seconds (int or float)
  this.name = name;
  this.urn = urn;
  this.startTime = startTime;
  this.stopTime = stopTime;
  this.fullUrn = urn + '&start=' + startTime;
  // loadState[this.name] = false;
  this.playbackInterval = setInterval(this.checkPlaybackTime, 1000);
}

SRF_Video.prototype = {

  play: function() {
    player.play();
    playState[this.name] = true;
    if (this.playbackInterval == undefined) {
      this.playbackInterval = setInterval(this.checkPlaybackTime, 1000);
    }
    if (player_isDisplayed == false) {
      this.displayPlayer();
    }
    // return playbackInterval;
  },

  pause: function() {
    player.pause();
    playState[this.name] = false;
  },

  recreatePlayer: function(playbackInterval) {
    // Wie kann ich playbackInterval hier verfügbar machen?
    clearInterval(this.playbackInterval);
    player.destroy();
    this.resetLoadState();
    this.resetPlayState();
    player = SRG.PlayerManager.createPlayer('SRF_player','inline', this.fullUrn);
    loadState[this.name] = true;
  },

  resetLoadState: function() {
    loadState.lotti = false;
    // var lotti_isLoaded = true;
    loadState.unterbaech = false;
    // var unterbaech_isLoaded = false;
    loadState.appenzell = false;
  },

  resetPlayState: function() {
    playState.lotti = false;
    // var lotti_isLoaded = true;
    playState.unterbaech = false;
    // var unterbaech_isLoaded = false;
    playState.appenzell = false;
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

  checkPlaybackTime: function() {
    player.getCurrentTime(function (currentTime) {
      // console.log(currentTime);
      if (currentTime >= this.stopTime) {
        player.pause();
        // Wie kann ich playbackInterval hier verfügbar machen?
        clearInterval(this.playbackInterval);
        player.seek(this.startTime);
        playState[this.name] = false;
      }
    });
  }
}

lotti = new SRF_Video('lotti', 'urn:srf:video:9b110c29-9032-4d65-bd8b-e60c39d30e0a', 535, 594.5);
unterbaech = new SRF_Video('unterbaech', 'urn:srf:video:5daf0760-6a4d-441a-9bf9-0a1cb9cb511a', 1045.8, 1065);
appenzell = new SRF_Video('appenzell', 'urn:srf:video:ad22fde5-2351-4d18-9cf2-9954c194d3a3', 0, 53);


function startPuzzle() {
  puzzle_videoQuestions.classList.toggle("display");
}

function checkPuzzle() {
  // Was die Spielerin eingegeben hat
  var solution1 = document.forms["puzzle_videoQuestions"]["solution1"].value;
  var solution2 = document.forms["puzzle_videoQuestions"]["solution2"].value;
  var solution3 = document.forms["puzzle_videoQuestions"]["solution3"].value;
  // Hier evtl mit RegEx arbeiten, damit Varianten als richtig erkannt werden
  if (solution1 == "1959" && solution2 == "Waadt, Genf" && solution3 == "Unterbäch") {
    window.alert("Glückwunsch! Diese Antworten sind richtig!");
  }
}

function setup() {
  button_lotti.addEventListener("click", lotti.handle.bind(lotti));
  button_unterbaech.addEventListener("click", unterbaech.handle.bind(unterbaech));
  button_appenzell.addEventListener("click", appenzell.handle.bind(appenzell));
  button_startPuzzle.addEventListener("click", startPuzzle);
  form_videoQuestions.addEventListener("submit", checkPuzzle);
  // button_appenzell.addEventListener("mouseover", hoverOverButton);
}

window.addEventListener("load", setup);
