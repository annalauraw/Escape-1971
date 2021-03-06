// SRF-Medien
var untertitel_urne = document.getElementById("untertitel_urne");
var untertitel_audio = document.getElementById("untertitel_audio");
var untertitel_gosteli = document.getElementById("untertitel_gosteli");
var untertitel_moos = document.getElementById("untertitel_moos");
var urne = new SRF_Video('urne', 'urn:srf:video:d43543bb-f5ed-45b6-96e3-a1c065c40335', 19, 26, untertitel_urne);
var angenommen = new SRF_Video('angenommen', 'urn:srf:audio:996e7ab3-2a3f-4e74-b1d9-0b5c00c3f93a', 46.5, 53, untertitel_audio);
var moos = new SRF_Video('moos', 'urn:srf:audio:996e7ab3-2a3f-4e74-b1d9-0b5c00c3f93a', 93.5, 103.5, untertitel_moos);
var gosteli = new SRF_Video('gosteli', 'urn:srf:audio:996e7ab3-2a3f-4e74-b1d9-0b5c00c3f93a', 143, 156, untertitel_gosteli);

// Hintergrundbild
var hintergrund = document.getElementById("hintergrund");

// Ruths Mund
var mund = document.getElementById("mund");
var mouthInterval = undefined;

// Audios Ruth
var warten = document.getElementById("warten");
var abschied = document.getElementById("abschied");
var ruth_audio = warten;

// Andere Audios
var applaus = document.getElementById("applaus");
applaus.volume = 1;
var stimmen = document.getElementById("stimmen");
stimmen.loop = true;

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


// div mit Quizfrage
var puzzle = document.getElementById("puzzle");
var button_solution = document.getElementById("button_solution");
var alert_wrongAnswer = document.getElementById("alert_wrongAnswer");
var button_diffAnswer = document.getElementById("button_diffAnswer");

// Rätsel-Formular mit Fragen und Eingabefeldern
var form_puzzle = document.forms["form_puzzle"];

// SRF Player wird mit einem ersten Medium geladen (Video Urne)
var player = SRG.PlayerManager.createPlayer('SRF_player','inline','urn:srf:video:d43543bb-f5ed-45b6-96e3-a1c065c40335&start=19');
var player_isDisplayed = false;

// Testfunktion, um eine Image map zu sehen (wo ist der klickbare Kreis?)
function showArea(area) {
  area.style.cursor = "pointer";
}

// Für die Mundbewegungen
function toggleMouth() {
  mund.classList.toggle("display");
}

function startInterval() {
  mouthInterval = setInterval(toggleMouth, 700);
}

function pauseInterval() {
  clearInterval(mouthInterval);
}

// Bound functions for event listeners
var boundFunctionAngenommen = angenommen.handle.bind(angenommen);
var boundFunctionMoos = moos.handle.bind(moos);
var boundFunctionGosteli = gosteli.handle.bind(gosteli);

// Die Hintergrundstimmen tönen nur, wenn der Radio nicht läuft
function startStopStimmen() {
  if (!stimmen.paused) {
    stimmen.pause();
  }
  else if (stimmen.paused) {
    stimmen.play();
  }
}

// Funktion, die nach Ende von Ruths Audios
// die nächsten EventListener registriert bzw.
// nicht mehr benötigte deaktiviert
function afterRuthsAudio(audioEl) {
  pauseInterval();
  if (audioEl == warten) {
    stimmen.play();
    button_radio_1.addEventListener("click", startStopStimmen);
    button_radio_1.addEventListener("click", boundFunctionAngenommen);
    button_radio_2.addEventListener("click", startStopStimmen);
    button_radio_2.addEventListener("click", boundFunctionMoos);
    button_radio_3.addEventListener("click", startStopStimmen);
    button_radio_3.addEventListener("click", boundFunctionGosteli);
    zeitungsstapel.addEventListener("click", showPaper);
    tv_gross.removeEventListener("click", showTV);
  }
  else if (audioEl == abschied) {
    startPuzzle();
  }
  pauseInterval();
}

// Funktion, die erstes Ruth-Audio startet
function playWarten() {
  ruth.removeEventListener("click", playWarten);
  stimmen.pause();
  warten.play();
  startInterval();
  warten.addEventListener("ended", function() {afterRuthsAudio(warten);});
}

// Funktion, die zweites Ruth-Audio startet
function playAbschied() {
  zeitungsstapel.removeEventListener("click", showPaper);
  button_radio_1.removeEventListener("click", boundFunctionAngenommen);
  button_radio_2.removeEventListener("click", boundFunctionMoos);
  button_radio_3.removeEventListener("click", boundFunctionGosteli);
  button_radio_1.removeEventListener("click", startStopStimmen);
  button_radio_2.removeEventListener("click", startStopStimmen);
  button_radio_3.removeEventListener("click", startStopStimmen);
  setTimeout(function() {
    stimmen.pause();
    abschied.play();
  }, 3000);
  setTimeout(function() {startInterval();}, 3000);
  abschied.addEventListener("ended", function() {afterRuthsAudio(abschied);});
}

// Funktion, die testet, ob die Zeitung angeschaut und die Radio-O-Töne angehört wurden
// Wenn ja, wird beim Klick auf Ruth das Abschieds-Audio abgespielt
function checkIfMediaConsumed() {
  if (paper_read && angenommen_listened && moos_listened && gosteli_listened) {
    playAbschied();
  }
}

// Zeitungsartikel verstecken
function hidePaper() {
  zeitungsartikel.classList.toggle("display");
  if (arrowDown.classList.contains("display")) {
    arrowDown.classList.toggle("display");
    arrowDown.removeEventListener("click", switchArticle);
  }
  else if (arrowUp.classList.contains("display")) {
    arrowUp.classList.toggle("display");
    arrowUp.removeEventListener("click", switchArticle);
  }
  hintergrund.style.opacity = "1";
  mund.style.opacity = "1";
  zeitungWeg_1.removeEventListener("click", hidePaper);
  zeitungWeg_2.removeEventListener("click", hidePaper);
  zeitungsstapel.addEventListener("click", showPaper);
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
  zeitungsstapel.removeEventListener("click", showPaper);
  hintergrund.style.opacity = "0.2";
  mund.style.opacity = "0.2";
  zeitungsartikel.classList.toggle("display");
  if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Durchbruch_gelungen_oben.png") {
    arrowDown.classList.toggle("display");
    arrowDown.addEventListener("click", switchArticle);
  }
  else if (currentArticle.attributes[1].value == "Bilder/Zeitungsartikel/Durchbruch_gelungen_unten.png") {
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
  stimmen.play();

}

// Grossen Fernseher anzeigen
function showTV() {
  black.classList.toggle("hide");
  fernseher.classList.toggle("hide");
}



// Quiz erneut anzeigen, wenn Antwort falsch war
function reDisplayPuzzle() {
  alert_wrongAnswer.classList.toggle("display");
  puzzle.classList.toggle("display");
  button_diffAnswer.removeEventListener("click", reDisplayPuzzle);
}

// Quizantwort überprüfen
function checkPuzzle() {

  // Was die Spielerin eingegeben hat bei der aktuellen Rätselfrage
  var playerSolution = document.forms["form_puzzle"]["gleich"].value;
  // richtige Antwort
  if (playerSolution == "jein") {
    puzzle_solved = true;
    puzzle.classList.toggle("display");
    // Abspann starten
    location.assign("abspann.html");
  }
  else {
    puzzle.classList.toggle("display");
    alert_wrongAnswer.classList.toggle("display");
    button_diffAnswer.addEventListener("click", reDisplayPuzzle);
  }
}

// Quiz starten
function startPuzzle() {
  // Div mit Rätselfrage anzeigen
  puzzle.classList.toggle("display");
  document.addEventListener("keypress", function(event) {preventEnter(event);})
  button_solution.addEventListener("click", checkPuzzle);
}

// Funktion, die das Default Behaviour der Enter-Taste
// (Formular abschicken mit POST) verhindert
// Ebenso das Default Behaviour der Backspace-Taste
// (zurück zur letzten Seite)
function preventEnter(event) {
  if (event.key == "Enter" || (event.keyCode == 8 && event.target == document.body)){
    event.preventDefault();
    // alert("Enter key was pressed!");
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
  document.addEventListener("keypress", preventEnter);
  // zeitungsstapel.addEventListener("mouseover", function(event) {showArea(event.target)});
}

window.addEventListener("load", setup);
