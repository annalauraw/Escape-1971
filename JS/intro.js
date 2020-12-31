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

// Testfunktion, um die Image map zu sehen (wo ist der klickbare Kreis?)
// function hoverOverButton() {
//   button_.style.cursor = "pointer";
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

  // startInterval() {
  //   setInterval(this.checkPlaybackTime(), 1000);
  // }
  // stopInterval(interval) {
  //   clearInterval(interval);
  // }

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

// function playLotti() {
//   player.play();
//   lotti_isPlaying = true;
//   // Wenn der oberste Knopf am Fernseher geklickt wird, wird
//   // das Video mit Lotti Ruckstuhl gestartet
//   // Wenn das Video bei 9min54sec angekommen ist (594sec),
//   // Video stoppen und an den Anfang der Sequenz (535sec)
//   // zurückspringen
//   playbackInterval = setInterval(checkPlaybackTime, 1000);
//   // Funktion, um das Intervall wieder zu stoppen
//   function stopInterval() {
//     clearInterval(playbackInterval);
//   }
//   // Diese Funtion wird jede Sekunde aufgerufen
//   function checkPlaybackTime() {
//     player.getCurrentTime(function (currentTime) {
//       // console.log(currentTime);
//       if (currentTime >= 594.5) {
//         player.pause();
//         stopInterval();
//         player.seek(535);
//         lotti_isPlaying = false;
//       }
//     });
//   }
// }
//
// function playUnterbaech() {
//   player.play();
//   unterbaech_isPlaying = true;
//   // Wenn der zweitoberste Knopf am Fernseher geklickt wird, wird
//   // das Video von Unterbäch gestartet
//   // Wenn das Video bei ...min...sec angekommen ist (1065sec),
//   // Video stoppen und an den Anfang der Sequenz (1045.8sec)
//   // zurückspringen
//   playbackInterval = setInterval(checkPlaybackTime, 1000);
//   // Funktion, um das Intervall wieder zu stoppen
//   function stopInterval() {
//     clearInterval(playbackInterval);
//   }
//   // Diese Funtion wird jede Sekunde aufgerufen
//   function checkPlaybackTime() {
//     player.getCurrentTime(function (currentTime) {
//       // console.log(currentTime);
//       // Stopp-Zeitpunkt noch ermitteln
//       if (currentTime >= 1065) {
//         player.pause();
//         stopInterval();
//         player.seek(1045.8);
//         unterbaech_isPlaying = false;
//       }
//     });
//   }
// }
//
// function handleLotti() {
//
//   // Wenn das Lotti-Video schon geladen ist, Player starten
//   if (lotti_isLoaded == true) {
//     if (lotti_isPlaying == false) {
//       playLotti();
//     }
//     else {
//       player.pause();
//       lotti_isPlaying = false;
//     }
//   }
//   // Sonst Video laden
//   else {
//     // let loadPromise = new Promise(function(resolve, reject) {
//     //   player.load('urn:srf:video:9b110c29-9032-4d65-bd8b-e60c39d30e0a');
//     //   if (/*everything worked*/) {
//     //     resolve(result);
//     //   }
//     //   else {
//     //     reject(error);
//     //   }
//     // });
//     stopInterval();
//     player.destroy();
//     player = SRG.PlayerManager.createPlayer('SRF_player','inline','urn:srf:video:9b110c29-9032-4d65-bd8b-e60c39d30e0a&start=535');
//     lotti_isLoaded = true;
//     unterbaech_isLoaded = false;
//     unterbaech_isPlaying = false;
//     // player.seek(535);
//     // player.getUrn(function (urn) {
//     //     console.log(urn);
//     // });
//     playLotti();
//   }
//   //Player ggf. anzeigen und starten, evtl noch
//   // Timeout einbauen, damit die SRF Controls nicht sichtbar sind
//   if (player_isDisplayed == false) {
//     SRF_player.classList.toggle("display");
//     player_isDisplayed = true;
//   }
// }
//
// function handleUnterbaech() {
//
//   // Wenn das Lotti-Video schon geladen ist, Player starten
//   if (unterbaech_isLoaded == true) {
//     if (unterbaech_isPlaying == false) {
//       playUnterbaech();
//     }
//     else {
//       player.pause();
//       unterbaech_isPlaying = false;
//     }
//   }
//   // Sonst Video laden
//   else {
//     // let loadPromise = new Promise(function(resolve, reject) {
//     //   player.load('urn:srf:video:9b110c29-9032-4d65-bd8b-e60c39d30e0a', false);
//     //   if (player.isLoaded() == true) {
//     //     resolve("Ok");
//     //   }
//     //   else {
//     //     reject("Error");
//     //   }
//     // });
//     // loadPromise.then(
//     //   function(value) {console.log(value);},
//     //   function(error) {console.log(error);}
//     // );
//     // player.load('urn:srf:video:5daf0760-6a4d-441a-9bf9-0a1cb9cb511a', false);
//     stopInterval();
//     player.destroy();
//     player = SRG.PlayerManager.createPlayer('SRF_player','inline','urn:srf:video:5daf0760-6a4d-441a-9bf9-0a1cb9cb511a&start=1045.8');
//     unterbaech_isLoaded = true;
//     lotti_isLoaded = false;
//     lotti_isPlaying = false;
//     // player.seek(1046);
//     player.getMetadata(function (metadata) {
//         console.log(metadata);
//     });
//     // player.getUrn(function (urn) {
//     //     console.log(urn);
//     // });
//     playUnterbaech();
//   }
//   //Player ggf. anzeigen und starten, evtl noch
//   // Timeout einbauen, damit die SRF Controls nicht sichtbar sind
//   if (player_isDisplayed == false) {
//     SRF_player.classList.toggle("display");
//     player_isDisplayed = true;
//   }
// }

// function playUnterbaech() {
//   //testvideo_1 ggf. stoppen und verstecken
//   if (lotti_isPlaying == true) {
//     player.pause();
//     lotti_isPlaying = false;
//   }
//   if (lotti_isDisplayed == true) {
//     SRF_player.classList.toggle("display");
//     lotti_isDisplayed = false;
//   }
//   //unterbaech ggf. anzeigen und starten
//   if (unterbaech_isDisplayed == false) {
//     unterbaech.classList.toggle("display");
//     unterbaech_isDisplayed = true;
//   }
//   if (unterbaech_isPlaying == false) {
//     unterbaech.play();
//     unterbaech_isPlaying = true;
//   }
//   else {
//     unterbaech.pause();
//     unterbaech_isPlaying = false;
//   }
// }

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
  // button_appenzell.addEventListener("click", playAppenzell);
  button_startPuzzle.addEventListener("click", startPuzzle);
  form_videoQuestions.addEventListener("submit", checkPuzzle);
  // button_unterbaech.addEventListener("mouseover", hoverOverButton);
}

window.addEventListener("load", setup);
