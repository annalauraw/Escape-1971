// Knöpfe an Fernseher und Radio, um Videos/Song zu starten
var button_lotti = document.getElementById("button_lotti");
var button_unterbaech = document.getElementById("button_unterbaech");
var button_appenzell = document.getElementById("button_appenzell");
var button_radio = document.getElementById("button_radio");
var radiosong = document.getElementById("radiosong");

// grosser Fernseher
var fernseher= document.getElementById("fernseher");
// Fläche des kleinen Fernsehers: Bei Klick darauf erscheint der grosse
var tv_gross = document.getElementById("tv_gross");
// Fläche links im lila Hintergrund - Klick lässt grossen Fernseher verschwinden
var area_hideTV = document.getElementById("area_hideTV");
// Schwarzer Hintergrund wegen durchsichtigem Bildschirm
var black = document.getElementById("tv_black");
// var blackIsDisplayed = false;

// Zustand der Videos - sind sie im Player geladen? Werden sie gerade abgespielt?
var lotti_isPlaying = false;
// var lotti_isLoaded = true;
var unterbaech_isPlaying = false;
// var unterbaech_isLoaded = false;
var appenzell_isPlaying = false;
// var appenzell_isLoaded = false;
var radiosong_isPlaying = false;


// div mit Rätsel zum Video
var puzzle_videoQuestions = document.getElementById("puzzle_videoQuestions");

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
  fernseher.classList.toggle("hide");
  if (player_isDisplayed) {
    SRF_player.classList.toggle("display");
    player_isDisplayed = false;
  }
  if (black.classList.contains("display")==false) {
    black.classList.toggle("hide");
  }
}

// Grossen Fernseher anzeigen
function showTV() {
  black.classList.toggle("hide");
  fernseher.classList.toggle("hide");
}

// Objekt, das den Zustand der Videos kennt - sind sie im Player geladen?
var loadState = {
  lotti: true,
  unterbaech: false,
  appenzell: false,
  urne: false
}

// Objekt, das den Zustand der Videos kennt - werden sie gerade abgespielt?
var playState = {
  lotti: false,
  unterbaech: false,
  appenzell: false,
  urne: false
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
function SRF_Video(name, urn, startTime, stopTime) {
  // startTime and stopTime in seconds (int or float)
  // var self = this;
  this.name = name;
  this.urn = urn;
  this.startTime = startTime;
  this.stopTime = stopTime;
  this.fullUrn = urn + '&start=' + startTime;
}

SRF_Video.prototype = {

  play: function() {
    player.play();
	//player.mute();
    area_hideTV.removeEventListener("click", hideTV);
    playState[this.name] = true;
    if (player_isDisplayed == false) {
      this.displayPlayer();
    }
    this.startInterval();
    // if (black.classList.contains("display")) {
    //   black.classList.toggle("display");
    // }
  },

  pause: function() {
    player.pause();
    playState[this.name] = false;
    area_hideTV.addEventListener("click", hideTV);
  },
   
   mute: function(){
	   player.mute();
	   
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
      // playbackInterval = undefined;
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


lotti = new SRF_Video('lotti', 'urn:srf:video:9b110c29-9032-4d65-bd8b-e60c39d30e0a', 535, 609);
unterbaech = new SRF_Video('unterbaech', 'urn:srf:id:996e7ab3-2a3f-4e74-b1d9-0b5c00c3f93a', 0, 0);
appenzell = new SRF_Video('appenzell', 'urn:srf:video:ad22fde5-2351-4d18-9cf2-9954c194d3a3', 0, 53);
urne = new SRF_Video('urne', 'urn:srf:video:d43543bb-f5ed-45b6-96e3-a1c065c40335', 19, 29);
// appenzell = new SRF_Video('appenzell', 'urn:srf:video:ad22fde5-2351-4d18-9cf2-9954c194d3a3', 0.1, 5);

// Funktion, die den Radio-Song abspielt
function playSong() {
  if (radiosong_isPlaying == false) {
    radiosong.play();
    radiosong_isPlaying = true;
    // alert("Radio is playing?");
  }
  else {
    radiosong.pause();
    radiosong_isPlaying = false;
    // alert("Radio is paused?");
  }
}





function setup() {
  // Fernseher und Radio
  tv_gross.addEventListener("click", showTV);
  button_lotti.addEventListener("click", urne.handle.bind(urne));
  button_unterbaech.addEventListener("click", unterbaech.handle.bind(unterbaech));
  button_appenzell.addEventListener("click", appenzell.handle.bind(appenzell));
  button_radio.addEventListener("click", playSong);
  area_hideTV.addEventListener("click", hideTV);
 
  
  // tv_gross.addEventListener("mouseover", function(event) {showArea(event.target)});
  // button_lotti.addEventListener("mouseover", function(event) {showArea(event.target)});
  // button_unterbaech.addEventListener("mouseover", function(event) {showArea(event.target)});
  // button_appenzell.addEventListener("mouseover", function(event) {showArea(event.target)});
  // button_radio.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);

