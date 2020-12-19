

var place00Y = 5;   // x-Koordinate des aktuell leeren Feldes
var place00X = 3;   // y-Koordinate des aktuell leeren Feldes

var mouseDownX = 1*0; // x-Koordinate des angeklickten Feldes
var mouseDownY = 1*0; // y-Koordinate des angeklickten Feldes

var changeSrc = "";   // Dateiname des Bildes des angeklickten Feldes
var active = false;   // active = true : Feld wurde angeklickt

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
   if ((place00X==mouseDownX)&&(Math.abs(place00Y-mouseDownY)==1)) check--;
   if ((place00Y==mouseDownY)&&(Math.abs(place00X-mouseDownX)==1)) check--;
   
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
      alert ("Gratuliere!");
      document.f_puzzle.b_35.src ="Bilder/bilder/abstimmungszettel-3-5.png";
   }
} 