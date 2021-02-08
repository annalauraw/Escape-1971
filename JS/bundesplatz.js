
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
var puzzleVertrauen = document.getElementsByClassName("quizbox")[0];

var showTV= document.getElementById("showTV");
var button_lieberherr = document.getElementById("button_lieberherr");
var SRF_player=document.getElementById("SRF_player");

// var player = SRG.PlayerManager.createPlayer('SRF_player','inline','urn:srf:video:280726b6-f954-4859-ab4e-503aab00d3a5');
var player = SRG.PlayerManager.createPlayer('SRF_player','inline', 'urn:srf:video:e11da950-18a1-4244-9521-95ce7ad5be83&start=81');
var playbackInterval = undefined;
var player_isDisplayed = false;

var TV_black=document.getElementById("TV_black");

//Untertitel
untertitel_lieberherrV=document.getElementById("untertitel_lieberherrV");
untertitel_lieberherrV2=document.getElementById("untertitel_lieberherrV2");
untertitel_lieberherrV3=document.getElementById("untertitel_lieberherrV3");


//bv4-Rätsel
var bv4=document.getElementsByClassName("bv4");
var bv4puzzle=document.getElementById("bv4puzzle");
var bv4text=document.getElementById("bv4text");

var alert_wrongAnswer = document.getElementById("alert_wrongAnswer");


function glow(){
	helvetia.classList.toggle("display");
	
}

function restoreVertrauen(){
	puzzleVertrauen.style.opacity="1";
	alert_wrongAnswer.classList.toggle("display");
	document.getElementById("button_alert").removeEventListener("click", restoreVertrauen);
}

function restorebv4(){
	bv4puzzle.classList.toggle("display");
	alert_wrongAnswer.classList.toggle("display");
	document.getElementById("button_alert").removeEventListener("click", restorebv4);
}

function closebv4(){
	bv4puzzle.classList.toggle("display");
	hintergrund.removeEventListener("click", closebv4);
	  for(i=0; i<bv4.length; i++){
     bv4[i].addEventListener("mouseover", glowBV4);
	 bv4[i].addEventListener("mouseleave", glowBV4);
	 bv4[i].addEventListener("click", bv4puzzleOpen);
}
}
	

function VertrauenFalsch(){
	alert_wrongAnswer.classList.toggle("display");
	puzzleVertrauen.style.opacity="0";
	document.getElementById("button_alert").addEventListener("click", restoreVertrauen);
}

function VertrauenRichtig(){
	puzzleVertrauen.classList.toggle("display");
	hintergrund.style.opacity="1";
	callFlag();
	helvetia.addEventListener("mouseover", glow);
	helvetia.addEventListener("mouseleave", glow);
	showTV.removeEventListener("click", displayTV);
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

function showhelvetia(){
	
	if (helvetia.classList.contains("display")){
		helvetia.classList.toggle("display");
	}
	
	setTimeout(function() {
    
	hintergrund.style.opacity="0.2";
	flag.style.opacity="0.2";
	helvetia.removeEventListener("mouseover", glow);
	helvetia.removeEventListener("mouseleave", glow);
	
	helvetiagross.classList.toggle("hide");
	document.getElementById('AV-applaus').play();
	document.getElementById('AV-applaus').addEventListener('ended', function(){
		hintergrund.style.opacity="1";
		flag.style.opacity="1";
		helvetiagross.classList.toggle("hide");
		document.getElementById('Tor').play();
		document.getElementById("Tor").addEventListener('ended', function(){
		location.assign("nationalratssaal.html");
  });
  });
  }, 1000);
}

// Wenn Fahne an den richtigen Koordinaten ist: Helvetia in die Hand drücken
function putFlag() {
  document.removeEventListener("mousemove", moveFlag);
  flag.style.left = "585px";
  flag.style.top = "120px";
  
  showhelvetia();
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
    hintergrund.removeEventListener("click", puzzleVertrauenFrauen);
    playState[this.name] = true;
    if (player_isDisplayed == false) {
      this.displayPlayer();
    }
    this.subtitles.classList.toggle("display");
    this.startInterval();
    showSubtitles();
    // if (TV_black.classList.contains("display")) {
     //  TV_black.classList.toggle("display");
     //}
  },

  pause: function() {
    player.pause();
    this.showSubtitles();
    playState[this.name] = false;
	hintergrund.addEventListener("click", puzzleVertrauenFrauen);
    //area_hideTV.addEventListener("click", hideTV);
  },

  recreatePlayer: function() {
     //if (TV_black.classList.contains("display") == false) {
		//	TV_black.classList.toggle("display");
   // }
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
lieberherrV = new SRF_Video('lieberherrV', "urn:srf:video:e11da950-18a1-4244-9521-95ce7ad5be83", 81, 110, untertitel_lieberherrV);
lieberherrV2 = new SRF_Video('lieberherrV2', "urn:srf:video:e11da950-18a1-4244-9521-95ce7ad5be83", 9, 66, untertitel_lieberherrV2);
lieberherrV3 = new SRF_Video('lieberherrV3', "urn:srf:video:e11da950-18a1-4244-9521-95ce7ad5be83", 110, 124, untertitel_lieberherrV3);

// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
function showArea(area) {
  area.style.cursor = "pointer";
}

function displayTV() {
	hintergrund.removeEventListener("click", closebv4);
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

function glowBV4(){
	//console.log("hi");
	for(i=0; i<bv4.length; i++){
	bv4[i].classList.toggle("display");
}
}

function bv4puzzleOpen(){
	document.addEventListener("keypress", function(event) {preventEnter(event);})
	bv4text.classList.toggle("hide");
	
	
	  for(i=0; i<bv4.length; i++){
			bv4[i].removeEventListener("mouseover", glowBV4);
			bv4[i].removeEventListener("mouseleave", glowBV4);
			bv4[i].removeEventListener("click", bv4puzzleOpen);
			bv4[i].classList.toggle("display");
}
}

function checkPuzzle(trigger){
	
	var playerSolution = document.forms[0]["solution"].value;
	if (playerSolution=="Schweizer"||playerSolution=="schweizer"){
		showTV.addEventListener("click", displayTV);
		bv4puzzle.classList.toggle("display");
		
	} else{
		bv4puzzle.classList.toggle("display");
		alert_wrongAnswer.classList.toggle("display");
		button_alert.addEventListener("click", restorebv4);
	}
	
}

function preventEnter(event) {
  if (event.key == "Enter"){
    event.preventDefault();
    // alert("Enter key was pressed!");
  }
}

function setup() {
  //button_startPuzzle.addEventListener("click", startPuzzle);
  //puzzleLieberherrButton.addEventListener("click", checkPuzzle);
  //button_lieberherr3.addEventListener("mouseover", function(event) {showArea(event.target)});
  backTV.addEventListener("click", displayTV);
  //helvetia.addEventListener("mouseover", function(event) {showArea(event.target)});
  // showTV.addEventListener("click", lieberherrV.handle.bind(lieberherrV));
  button_solution.addEventListener("click", function() {checkPuzzle(this);});
  for(i=0; i<bv4.length; i++){
     bv4[i].addEventListener("mouseover", glowBV4);
	 bv4[i].addEventListener("mouseleave", glowBV4);
	 bv4[i].addEventListener("click", bv4puzzleOpen);
}
  bv4text.addEventListener("click", function(){
		bv4puzzle.classList.toggle("display");
		bv4text.classList.toggle("hide");
		hintergrund.addEventListener("click", closebv4);
	});
}

window.addEventListener("load", setup);
