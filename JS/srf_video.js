// Intervall, das die aktuelle Abspielsekunde kontrolliert
// Wird von SRF_player-Methoden gestartet und gestoppt
var playbackInterval = undefined;

// Funktion, die eine Closure enthält und die Callback-Funktion für das
// Intervall zurückgibt,
// die an das Video-Objekt gebunden ist (andernfalls wäre sie an
// Window gebunden)
function returnCheckPlaybackTime(obj) {
  return function() {
    player.getCurrentTime(function (currentTime) {
      // console.log("Current playback time: " + currentTime);
      if (currentTime >= obj.stopTime) {
        obj.pause();
        obj.stopInterval();
        player.seek(obj.startTime);
        playState[obj.name] = false;
        if (obj == angenommen) {
          angenommen_listened = true;
          var applaus = document.getElementById("applaus");
          applaus.play();
          stimmen.play();
          checkIfMediaConsumed();
        }
        else if (obj == moos) {
          moos_listened = true;
          stimmen.play();
          checkIfMediaConsumed();
        }
        else if (obj == gosteli) {
          gosteli_listened = true;
          stimmen.play();
          checkIfMediaConsumed();
        }
      }
    });
  }
}

// Objekt, das den Zustand der Videos kennt - sind sie im Player geladen?
var loadState = {
  lotti: false,
  unterbaech: false,
  appenzell: false,
  urne: true,
  angenommen: false,
  moos: false,
  gosteli: false
}

// Objekt, das den Zustand der Videos und Audios kennt - werden
// sie gerade abgespielt?
var playState = {
  lotti: false,
  unterbaech: false,
  appenzell: false,
  urne: false,
  angenommen: false,
  moos: false,
  gosteli: false
}

// Prototyp SRF_Video
function SRF_Video(name, urn, startTime, stopTime, subtitles) {
  // startTime and stopTime in seconds (int or float)
  this.name = name;
  this.urn = urn;
  this.startTime = startTime;
  this.stopTime = stopTime;
  this.fullUrn = urn + '&start=' + startTime;
  this.subtitles = subtitles;
}

SRF_Video.prototype = {

  showSubtitles: function() {
    if (this.subtitles.classList.contains("display") == false) {
      this.subtitles.classList.toggle("display");
    }
    // this.subtitles.classList.toggle("display");
  },

  hideSubtitles: function() {
    if (this.subtitles.classList.contains("display")) {
      this.subtitles.classList.toggle("display");
    }
  },

  play: function() {
    if (this.name == 'urne') {
      player.volume(0);
      // alert("hello");
    }
    else {
      player.volume(1);
    }
    player.play();
    area_hideTV_1.removeEventListener("click", hideTV);
    area_hideTV_2.removeEventListener("click", hideTV);
    playState[this.name] = true;
    if (player_isDisplayed == false) {
      // Bei Audios: Player nicht anzeigen
      let videos = ['urne', 'lotti', 'unterbaech', 'appenzell'];
      if (videos.includes(this.name)) {
        this.displayPlayer();
      }
    }
    this.startInterval();
    // Bei den Audios sind die Untertitel nur ein Platzhalter - nicht anzeigen
    if (this.name != 'angenommen') {
      this.showSubtitles();
    }
  },

  pause: function() {
    player.pause();
    this.hideSubtitles();
    playState[this.name] = false;
    area_hideTV_1.addEventListener("click", hideTV);
    area_hideTV_2.addEventListener("click", hideTV);
  },

  recreatePlayer: function() {
    // Untertitel des vorherigen Videos verstecken
    this.hideSubtitles();
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
    loadState.angenommen = false;
    loadState.moos = false;
    loadState.gosteli = false;
  },

  resetPlayState: function() {
    playState.lotti = false;
    playState.unterbaech = false;
    playState.appenzell = false;
    playState.urne = false;
    playState.angenommen = false;
    playState.moos = false;
    playState.gosteli = false;
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
