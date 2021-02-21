// Hintergrundbild
var hintergrund = document.getElementById("hintergrund");

// Audios Ruth
var warten = document.getElementById("warten");
var abschied = document.getElementById("abschied");
var ruth_audio = warten;

// Ruth-Area, das die Audios auslöst
var ruth = document.getElementById("ruth");

// Knöpfe an Fernseher und Radio, um Videos/Song zu starten
var button_tv_1 = document.getElementById("button_tv_1");
var button_tv_2 = document.getElementById("button_tv_2");
var button_tv_3 = document.getElementById("button_tv_3");
var button_radio_1 = document.getElementById("button_radio_1");
var button_radio_2 = document.getElementById("button_radio_2");
var button_radio_3 = document.getElementById("button_radio_3");

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

// Zeitungsartikel
var zeitungsartikel = document.getElementById("zeitungsartikel");
var zeitungsstapel = document.getElementById("zeitungsstapel");
// Artikelteil, der aktuell im img-Tag als src ist
var currentArticle = document.getElementById("artikelbild");
var arrowDown = document.getElementById("arrowDown");
var arrowUp = document.getElementById("arrowUp");

// Wurden die Zeitung angesehen und das Radio gehört?
var angenommen_listened = false;
var moos_listened = false;
var gosteli_listened = false;
var paper_read = false;

//Anzeige Frage
var anzeige =1;

var untertitel_urne = document.getElementById("untertitel_urne");
var untertitel_audio = document.getElementById("untertitel_audio");
var untertitel_gosteli = document.getElementById("untertitel_gosteli");
var untertitel_moos = document.getElementById("untertitel_moos");

// div mit Rätsel zum Video
var puzzle_videoQuestions = document.getElementById("puzzle_videoQuestions");

// Rätsel zum Video, Formular mit Fragen und Eingabefeldern
var form_videoQuestions = document.forms["puzzle_videoQuestions"];

// SRF Player wird mit einem ersten Medium geladen (Video Urne)
var player = SRG.PlayerManager.createPlayer('SRF_player','inline','urn:srf:video:d43543bb-f5ed-45b6-96e3-a1c065c40335&start=19');
var player_isDisplayed = false;

// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
function showArea(area) {
  area.style.cursor = "pointer";
}

// Funktion, die nach Ende von Ruths Audios
// die nächsten EventListener registriert bzw.
// nicht mehr benötigte deaktiviert
function afterRuthsAudio(audioEl) {
  if (audioEl == warten) {
    button_radio_1.addEventListener("click", angenommen.handle.bind(angenommen));
    button_radio_1.addEventListener("click", function(){angenommen_listened = true;});
    button_radio_1.addEventListener("mouseup", checkIfMediaConsumed);
    button_radio_2.addEventListener("click", moos.handle.bind(moos));
    button_radio_2.addEventListener("click", function(){moos_listened = true;});
    button_radio_2.addEventListener("mouseup", checkIfMediaConsumed);
    button_radio_3.addEventListener("click", gosteli.handle.bind(gosteli));
    button_radio_3.addEventListener("click", function(){gosteli_listened = true;});
    button_radio_3.addEventListener("mouseup", checkIfMediaConsumed);
    zeitungsstapel.addEventListener("click", showPaper);
    tv_gross.removeEventListener("click", showTV);
  }
  else if (audioEl == abschied) {
    zeigFrage();
  }
}

// Funktion, die erstes Ruth-Audio startet
function playWarten() {
  warten.play();
  warten.addEventListener("ended", function() {afterRuthsAudio(warten);});
  ruth.removeEventListener("click", playWarten);
}

// Funktion, die zweites Ruth-Audio startet
function playAbschied() {
  abschied.play();
  abschied.addEventListener("ended", function() {afterRuthsAudio(abschied);});
  ruth.removeEventListener("click", playAbschied);
}

// Funktion, die testet, ob die Zeitung angeschaut und die Radio-O-Töne angehört wurden
// Wenn ja, wird beim Klick auf Ruth das Abschieds-Audio abgespielt
function checkIfMediaConsumed() {
  if (paper_read && angenommen_listened && moos_listened && gosteli_listened) {
    ruth.addEventListener("click", playAbschied);
  }
}

// Zeitungsartikel verstecken
function hidePaper() {
  zeitungsartikel.classList.toggle("display");
  if (arrowDown.classList.contains("display")) {
    arrowDown.classList.toggle("display");
  }
  else if (arrowUp.classList.contains("display")) {
    arrowUp.classList.toggle("display");
  }
  hintergrund.style.opacity = "1";
  zeitungWeg_1.removeEventListener("click", hidePaper);
  zeitungWeg_2.removeEventListener("click", hidePaper);
  arrowDown.removeEventListener("click", switchArticle);
  arrowUp.removeEventListener("click", switchArticle);
  paper_read = true;
  checkIfMediaConsumed();
}

// Zwischen den Zeitungsartikeln wechseln
function switchArticle() {

  if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Durchbruch_gelungen_oben.png") {
    currentArticle.attributes[1].value = "Bilder/Zeitungsartikel/Durchbruch_gelungen_unten.png";
    arrowDown.classList.toggle("display");
    arrowUp.classList.toggle("display");
    arrowDown.removeEventListener("click", switchArticle);
    arrowUp.addEventListener("click", switchArticle);
  }
  else if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Durchbruch_gelungen_unten.png") {
    currentArticle.attributes[1].value = "Bilder/Zeitungsartikel/Durchbruch_gelungen_oben.png";
    arrowUp.classList.toggle("display");
    arrowDown.classList.toggle("display");
    arrowUp.removeEventListener("click", switchArticle);
    arrowDown.addEventListener("click", switchArticle);
  }
}

// Zeitungsartikel anzeigen
function showPaper() {
  hintergrund.style.opacity = "0.2";
  zeitungsartikel.classList.toggle("display");
  if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Durchbruch_gelungen_oben.png") {
    arrowDown.classList.toggle("display");
    arrowDown.addEventListener("click", switchArticle);
  }
  else if (currentArticle.attributes[1].value == "Bilder/Durchbruch_gelungen_unten.png") {
    arrowUp.classList.toggle("display");
    arrowUp.addEventListener("click", switchArticle);
  }
  zeitungWeg_1.addEventListener("click", hidePaper);
  zeitungWeg_2.addEventListener("click", hidePaper);
}


// Wenn Radio gespielt wird, kann Fernseher nicht mehr gross geklickt werden
function noMoreTV() {
  tv_gross.removeEventListener("click", showTV);
  ruth.removeEventListener("click", noMoreTV);
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
  // Ruth ist bereit für erstes Audio
  ruth.addEventListener("click", playWarten);
  // Sobald Ruth spricht, soll Fernseher nicht mehr angezeigt werden können
  ruth.addEventListener("click", noMoreTV);
}

// Grossen Fernseher anzeigen
function showTV() {
  black.classList.toggle("hide");
  fernseher.classList.toggle("hide");
}

urne = new SRF_Video('urne', 'urn:srf:video:d43543bb-f5ed-45b6-96e3-a1c065c40335', 19, 26, untertitel_urne);
angenommen = new SRF_Video('angenommen', 'urn:srf:audio:996e7ab3-2a3f-4e74-b1d9-0b5c00c3f93a', 46.5, 53, untertitel_audio);
moos = new SRF_Video('moos', 'urn:srf:audio:996e7ab3-2a3f-4e74-b1d9-0b5c00c3f93a', 93.5, 104, untertitel_moos);
gosteli = new SRF_Video('gosteli', 'urn:srf:audio:996e7ab3-2a3f-4e74-b1d9-0b5c00c3f93a', 143, 156, untertitel_gosteli);

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
  button_tv_1.addEventListener("click", urne.handle.bind(urne));
  button_tv_2.addEventListener("click", urne.handle.bind(urne));
  button_tv_3.addEventListener("click", urne.handle.bind(urne));
  //button_radio.addEventListener("click", playSong);
  area_hideTV_1.addEventListener("click", hideTV);
  area_hideTV_2.addEventListener("click", hideTV);
  // hintergrund.addEventListener("click", zeigFrage);
  //area_hideTV.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);
