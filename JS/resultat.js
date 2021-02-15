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
// Klick lässt grossen Fernseher verschwinden
var area_hideTV_1 = document.getElementById("area_hideTV_1");
var area_hideTV_2 = document.getElementById("area_hideTV_2");
// Schwarzer Hintergrund wegen durchsichtigem Bildschirm
var black = document.getElementById("tv_black");
// var blackIsDisplayed = false;

//Anzeige Frage
var anzeige =1;

// Zustand der Videos - sind sie im Player geladen? Werden sie gerade abgespielt?
var lotti_isPlaying = false;
// var lotti_isLoaded = true;
var unterbaech_isPlaying = false;
// var unterbaech_isLoaded = false;
var appenzell_isPlaying = false;
// var unterbaech_isLoaded = false;
var urne_isPlaying = false;
// var appenzell_isLoaded = false;
var radiosong_isPlaying = false;

var untertitel_urne = document.getElementById("untertitel_urne");
var untertitel_lotti = document.getElementById("untertitel_lotti");
var untertitel_unterbaech = document.getElementById("untertitel_unterbaech");
var untertitel_appenzell = document.getElementById("untertitel_appenzell");


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
	//"M" auf Keyboard drücken, damit Player stumm ist.
	
	var event = document.createEvent('Event');
    event.keyCode = 77; // Deprecated, prefer .key instead.
    event.key = 77;
	event.initEvent('keydown');
		
    document.dispatchEvent(event);
	
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
	loadState.urne = false;
  },

  resetPlayState: function() {
    playState.lotti = false;
    playState.unterbaech = false;
    playState.appenzell = false;
	playState.urne = false;
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
urne = new SRF_Video('urne', 'urn:srf:video:d43543bb-f5ed-45b6-96e3-a1c065c40335', 19, 29, untertitel_urne);
//urne = new SRF_Video('urne', 'urn:srf:video:7afb5df0-091e-4871-b454-933360a7750a', 859, 888, untertitel_urne);

//Funktionen für Radio-Button-Rätsel
function richtig(){
	location.assign("abspann.html");
}

function restoreFrage(){
	document.getElementById("button_alert").removeEventListener("click", restoreFrage);
	alert_wrongAnswer.classList.toggle("display");
	frage.style.opacity="1";
}

function falsch(){
	alert_wrongAnswer.classList.toggle("display");
	frage.style.opacity="0";
	//document.getElementById('3_nein').play();
	document.getElementById("button_alert").addEventListener("click", restoreFrage);
}

function zeigFrage(){
	frage.classList.toggle("display");
	if (anzeige==0){
	hintergrund.addEventListener("click", zeigFrage);
	anzeige=1
	} else{
		hintergrund.removeEventListener("click", zeigFrage);
		anzeige=0;
	}
}


function setup() {
  // Fernseher und Radio
  tv_gross.addEventListener("click", showTV);
  button_lotti.addEventListener("click", urne.handle.bind(urne));
  button_unterbaech.addEventListener("click", unterbaech.handle.bind(unterbaech));
  button_appenzell.addEventListener("click", appenzell.handle.bind(appenzell));
  //button_radio.addEventListener("click", playSong);
  area_hideTV_1.addEventListener("click", hideTV);
  area_hideTV_2.addEventListener("click", hideTV);
  hintergrund.addEventListener("click", zeigFrage);
 
  
  //area_hideTV.addEventListener("mouseover", function(event) {showArea(event.target)});
  //button_lotti.addEventListener("mouseover", function(event) {showArea(event.target)});
  // button_unterbaech.addEventListener("mouseover", function(event) {showArea(event.target)});
  // button_appenzell.addEventListener("mouseover", function(event) {showArea(event.target)});
  // button_radio.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);

