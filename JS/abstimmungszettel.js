

var place00Y = 4;   // x-Koordinate des aktuell leeren Feldes
var place00X = 1;   // y-Koordinate des aktuell leeren Feldes

var mouseDownX = 1*0; // x-Koordinate des angeklickten Feldes
var mouseDownY = 1*0; // y-Koordinate des angeklickten Feldes

var changeSrc = "";   // Dateiname des Bildes des angeklickten Feldes
var active = false;   // active = true : Feld wurde angeklickt

var cookieTest=document.cookie;
var puzzle =document.getElementById("puzzle");
var zettel =document.getElementById("zettel");
var hintergrund=document.getElementById("hintergrund");
//document.getElementById("AV-ticken").autoplay=true;

document.cookie="abstimmungszettelB=done";

function goBack() {
		location.assign("wecker_2.html");
}

function done() {
   result = true;
   for (i = 1; i <= 3; i++) {
      if (result == false) break;
      for (j = 1; j <= 5; j++) {
         var elementsSrc = document.getElementById("b_"+i+j).src;
         len = elementsSrc.length;
		 elementsSrc = elementsSrc.substring(len-39,len);
         imgName = "Bilder/bilder/abstimmungszettel-"+i+"-"+j+".png";
         if (elementsSrc == imgName){} else result = false;
         if ((i == 3) && (j == 5)) result = true;
         if (result == false) break;
      }
   }
   return result;
}

function pieceUp(nr) {
   mouseDownY = nr%10;
   h = nr - nr%10;
   h/=10;
   mouseDownX = h;


   var check = 1;
   console.log(check);
   console.log(place00Y);
   console.log(mouseDownY);
   console.log(place00X);
   console.log(mouseDownX);
   if ((place00X==mouseDownX)&&(Math.abs(place00Y-mouseDownY)==1)) check--;
   if ((place00Y==mouseDownY)&&(Math.abs(place00X-mouseDownX)==1)) check--;
   console.log(check);
   if (check == 0) {
      elementsName = "b_" + mouseDownX + mouseDownY;
      changeSrc = document.getElementById(elementsName).src;
	  len = changeSrc.length;
      changeSrc = changeSrc.substring(len-39,len);
      document.getElementById(elementsName).src="";
      document.getElementById("b_"+place00X+place00Y).src=changeSrc;
      place00X = mouseDownX;
      place00Y = mouseDownY;
      active = false;
   }
   if (done() == true) {
      //alert ("Gratuliere!");
      puzzle.classList.toggle("hide");
	  zettel.classList.toggle("display");
	  document.cookie="schieberaetsel=done";
   }
}

function getCookie(cname) {
  var test = cname + "=";
  console.log(test);
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(test) == 0) {
      return c.substring(test.length, c.length);
    }
  }
  return "";
}

function testCookie(){
  var schieberaetsel  = getCookie("schieberaetsel");
  console.log(schieberaetsel);
	if (schieberaetsel != "") {
	puzzle.classList.toggle("hide");
	zettel.classList.toggle("display");

  }
}

function getCookie(cname) {
  var test = cname + "=";

  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(test) == 0) {
      return c.substring(test.length, c.length);
    }
  }
  return "";
}

function checkTicken(){

	var aufziehenCookie=getCookie("aufziehen");
	console.log(aufziehenCookie);
	if (aufziehenCookie=="done"){

		document.getElementById("AV-ticken").play();
		document.getElementById("AV-ticken").volume=0.8;
		document.getElementById("AV-ticken").loop = true;
		document.removeEventListener("click",checkTicken);

	}
}

function schnarchen(){
	schnarch=document.getElementById("schnarch");
	schnarch.volume = 0.4;
	schnarch.play();
	setInterval(function() { schnarch.play(); },30000);
	document.removeEventListener("click",schnarchen);
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
	testCookie();
	hintergrund.addEventListener("click", goBack);
	document.addEventListener("click",checkTicken);
	document.addEventListener("click",schnarchen);
	document.addEventListener("keypress", preventEnter);
}


window.addEventListener("load", setup);
