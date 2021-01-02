

var place00Y = 4;   // x-Koordinate des aktuell leeren Feldes
var place00X = 1;   // y-Koordinate des aktuell leeren Feldes

var mouseDownX = 1*0; // x-Koordinate des angeklickten Feldes
var mouseDownY = 1*0; // y-Koordinate des angeklickten Feldes

var changeSrc = "";   // Dateiname des Bildes des angeklickten Feldes
var active = false;   // active = true : Feld wurde angeklickt
var cookieTest=document.cookie;
var puzzle =document.getElementById("puzzle");
var zettel =document.getElementById("zettel")

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
	  zettel.addEventListener("click",goBack);
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
	alert("Bereits gelöst, Bravo!");
	
  } 
}

function setup() {
	testCookie();
	zettel.addEventListener("click", goBack);
}


window.addEventListener("load", setup);
