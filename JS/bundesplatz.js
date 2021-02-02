
// div mit Hintergrundbild - wird für das Erscheinen bzw. Bewegen der Fahne
// gebraucht
var hintergrund = document.getElementById("hintergrund");
// Fahnen-Bild
var flag = document.getElementById("fahne");
// Button am Fernseher, der das Lieberherr-Video startet
// Noch passiert nichts, wenn man klickt

// Helvetias Hand
var helvetia = document.getElementById("helvetia");

var fernseher =document.getElementById("fernseher");
var puzzleVertrauen = document.getElementById("puzzleVertrauen");

var showTV= document.getElementById("showTV");
var button_lieberherr = document.getElementById("button_lieberherr");
var SRF_player=document.getElementById("SRF_player");

// var player = SRG.PlayerManager.createPlayer('SRF_player','inline','urn:srf:video:280726b6-f954-4859-ab4e-503aab00d3a5');
var player = SRG.PlayerManager.createPlayer('SRF_player','inline', 'urn:srf:video:e11da950-18a1-4244-9521-95ce7ad5be83&start=81');
var playbackInterval = undefined;
var player_isDisplayed = false;

var TV_black=document.getElementById("TV_black");

function glow(){
	helvetia.classList.toggle("display");
	
}


function richtig(){
	puzzleVertrauen.classList.toggle("display");
	hintergrund.style.opacity="1";
	callFlag();
	helvetia.addEventListener("mouseover", glow);
	helvetia.addEventListener("mouseleave", glow);
}



// Funktion, die das Rätsel zu Lieberherr anzeigt
function startPuzzle() {
  puzzle_lieberherrQuestions.classList.toggle("display");
}


// Funktion, die die Fahne bewegt
function moveFlag(event) {
  // var outerDiv = document.getElementsByClassName("imagecontainer").item(0);
  var windowMarginLeft = (window.innerWidth - 1200) / 2;
  // var windowMarginTop = window.innerWidth - outerDiv.height;
  // Die Fahne ist immer dort, wo der Mauszeiger ist
  // bzw. 20px rechts davon, damit auf Helvetias Hand geklickt
  // werden kann, ohne dass die Fahme im Weg ist
  flag.style.left = event.clientX - windowMarginLeft + 20 + 'px';
  flag.style.top = event.clientY -50 + 'px';
  helvetia.addEventListener("click", putFlag);

}

// Wenn Fahne an den richtigen Koordinaten ist: Helvetia in die Hand drücken
function putFlag() {
  document.removeEventListener("mousemove", moveFlag);
  flag.style.left = "570px";
  flag.style.top = "150px";
  document.getElementById('Tor').play();
  document.getElementById("Tor").addEventListener('ended', function(){
	  location.assign("nationalratssaal.html");
  });
}

// Funktion, die die Fahne erscheinen lässt: Es wird ein addEventListener
// für die Mausbewegungen im äussersten div registriert
function callFlag() {
  document.addEventListener("mousemove", moveFlag);
  flag.classList.toggle("display");
  // Übergangslösung
  // button_removeFlag.addEventListener("click", stopFlag);
}



// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
//function showArea(area) {
//   area.style.cursor = "pointer";
// }

// Objekt, das den Zustand der Videos kennt - sind sie im Player geladen?
var loadState = {
  lieberherrV: true,
  lieberherrV2: false,
  lieberherrV3: false
}

// Objekt, das den Zustand der Videos kennt - werden sie gerade abgespielt?
var playState = {
  lieberherrV: false,
  lieberherrV2: false,
  lieberherrV3: false
}

// Funktion, die eine Closure enthält und die Callback-Funktion für das
// Intervall zurückgibt,
// die an das Video-Objekt gebunden ist (andernfalls wäre sie an
// Window gebunden)

function puzzleVertrauenFrauen(){
	hintergrund.removeEventListener("click", puzzleVertrauenFrauen);
	fernseher.classList.toggle("display");
	puzzleVertrauen.classList.toggle("display");
	
	
	if (SRF_player.classList.contains("display")){
		SRF_player.classList.toggle("display");
	}
	if (TV_black.classList.contains("display")){
		TV_black.classList.toggle("display");
	}
	
}


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
  //this.subtitles = subtitles;
}

SRF_Video.prototype = {

  /*showSubtitles: function() {
    this.subtitles.classList.toggle("display");
  },*/

  play: function() {
    player.play();
    hintergrund.removeEventListener("click", puzzleVertrauenFrauen);
    playState[this.name] = true;
    if (player_isDisplayed == false) {
      this.displayPlayer();
    }
    //this.subtitles.classList.toggle("display");
    this.startInterval();
    //showSubtitles();
     if (TV_black.classList.contains("display")) {
       TV_black.classList.toggle("display");
     }
  },

  pause: function() {
    player.pause();
    //this.showSubtitles();
    playState[this.name] = false;
	hintergrund.addEventListener("click", puzzleVertrauenFrauen);
    //area_hideTV.addEventListener("click", hideTV);
  },

  recreatePlayer: function() {
     if (TV_black.classList.contains("display") == false) {
			TV_black.classList.toggle("display");
    }
    this.stopInterval();
    player.destroy();
    this.resetLoadState();
    this.resetPlayState();
    player = SRG.PlayerManager.createPlayer('SRF_player','inline', this.fullUrn);
    loadState[this.name] = true;
  },

  resetLoadState: function() {
    loadState.lieberherrV = false;
	loadState.lieberherrV2 = false;
	loadState.lieberherrV3 = false;
  },

  resetPlayState: function() {
    playState.lieberherrV = false;
	playState.lieberherrV2 = false;
	playState.lieberherrV3 = false;
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
	// fernseher.classList.toggle("display");
	// hintergrund.style.opacity="0.2";
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

// lieberherrV = new SRF_Video('lieberherrV', 'urn:srf:video:280726b6-f954-4859-ab4e-503aab00d3a5', 0, 5);
lieberherrV = new SRF_Video('lieberherrV', "urn:srf:video:e11da950-18a1-4244-9521-95ce7ad5be83", 81, 110);
lieberherrV2 = new SRF_Video('lieberherrV2', "urn:srf:video:e11da950-18a1-4244-9521-95ce7ad5be83", 9, 66);
lieberherrV3 = new SRF_Video('lieberherrV2', "urn:srf:video:e11da950-18a1-4244-9521-95ce7ad5be83", 110, 124);

// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
function showArea(area) {
  area.style.cursor = "pointer";
}

function displayTV() {
	showTV.removeEventListener("click", displayTV);
	fernseher.classList.toggle("display");
	hintergrund.style.opacity="0.2";
	TV_black.classList.toggle("display");
	button_lieberherr.addEventListener("click", lieberherrV.handle.bind(lieberherrV));
	button_lieberherr2.addEventListener("click", lieberherrV2.handle.bind(lieberherrV2));
	button_lieberherr3.addEventListener("click", lieberherrV3.handle.bind(lieberherrV3));
	hintergrund.addEventListener("click", puzzleVertrauenFrauen);
	if (puzzleVertrauen.classList.contains("display")){
		puzzleVertrauen.classList.toggle("display");
	}
}


function setup() {
  //button_startPuzzle.addEventListener("click", startPuzzle);
  //puzzleLieberherrButton.addEventListener("click", checkPuzzle);
  button_lieberherr3.addEventListener("mouseover", function(event) {showArea(event.target)});
  backTV.addEventListener("click", displayTV);
  //helvetia.addEventListener("mouseover", function(event) {showArea(event.target)});
  // showTV.addEventListener("click", lieberherrV.handle.bind(lieberherrV));
	showTV.addEventListener("click", displayTV);
}

window.addEventListener("load", setup);
