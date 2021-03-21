
var argumentgross=document.getElementById("argumentgross");
var pult=document.getElementById("pult_light");
var abfall=document.getElementById("abfall_light");
var hintergrund=document.getElementById("hintergrund");
var istargumentoffen=null;
var crt="";

for (i=1; i<11; i++){
	this ["arg"+i]=document.getElementById("arg"+i);

}

function lightup(ev){
	var feld=ev.target.id
	document.getElementById(feld).classList.toggle("display");

}


function lightupDrop(ev){
	var feld=ev.target.id
	document.getElementById(feld).classList.toggle("display");
	setTimeout(function(){ document.getElementById(feld).classList.toggle("display"); }, 1500);


}


function allowDrop(ev){
	ev.preventDefault();

}

function checkElements(number){
	var check=document.getElementsByClassName("argument");
	console.log(check);

	if (check.length<1){
		if (number==2){
			document.getElementById("AV-reissen").addEventListener("ended", function (){
				location.assign("zwischenbild.html");
			});
		} else {
			document.getElementById("AV-applaus").addEventListener("ended", function (){
				location.assign("zwischenbild.html");
			});
		}
	}


}

function dropAbfall(event){
	event.preventDefault();

	if (test < 6){
		//alert("Korrekt");
		document.getElementById('AV-reissen').play();
		document.getElementById(argument).remove();
		closeArgument();
		checkElements(2);
	}
}
function dropPult(){
	event.preventDefault();
	if (test > 5){
		//alert("Korrekt");
		document.getElementById('AV-applaus').play();
		document.getElementById(argument).remove();
		closeArgument();
		checkElements(3);
	}

}

function moveCrt(event){
	//console.log("move");

	var windowMarginLeft = (window.innerWidth - 1200) / 2;
  crt.style.left = event.clientX - windowMarginLeft + 20 + 'px';
  crt.style.top = event.clientY -50 + 'px';

	/*dragX = event.pageX;
	dragY = event.pageY;
    crt.style.left= dragX+"px";
	crt.style.top=  dragY+"px";
    console.log("X: "+dragX+" Y: "+dragY);*/
}



function dragstartArgument(event){
	//ghost-image neu definieren und ausblenden
	argumentgross.style.opacity="0";
	var img = document.createElement("img");
    //img.src = "Bilder/bilder/"+argument+".png";
	img.src="";
    event.dataTransfer.setDragImage(img, 200, 200);

	//Bild das mitgeht einfügen

	crt = document.createElement("div");
	crtimg = document.createElement("img");
	crt.id="crt";
	crtimg.src = "Bilder/bilder/"+argument+".png";
    //crt.style.position = "absolute";

	document.getElementById("imagecontainer").appendChild(crt);
	document.getElementById("crt").appendChild(crtimg);
	event.dataTransfer.setData('text/html', null);

	pult.addEventListener("dragenter", lightupDrop);
	abfall.addEventListener("dragenter", lightupDrop);

}

function dragArgument(event){
	event.preventDefault();
	//event.dataTransfer.setData('text/html', null);
}


 function bildweg (event) {
	document.getElementById("crt").remove();
	//argumentgross.classList.toggle("display");
	argumentgross.style.opacity="1";

}


function closeArgument(){
	console.log("YES");
	hintergrund.removeEventListener("click", closeArgument);
	argumentgross.classList.toggle("display");

	istargumentoffen=null;
	if (document.getElementById(argument)){
	document.getElementById(argument).classList.toggle("hide");
	}

}

function openArgument(event){
	if (istargumentoffen!=null){
		document.getElementById(argument).classList.toggle("hide");
	} else {
		argumentgross.classList.toggle("display");
	}

	argument=event.target.id;
	//var elem = document.createElement("img");
    //elem.setAttribute("src", "Bilder/bilder/"+argument+".png");
   //document.getElementById("argumentgross").appendChild(elem);
    argumentgross.style.backgroundImage="url('./Bilder/bilder/"+argument+".png')";



	test=argument.replace("arg","");


	//argumentgross.addEventListener("onmousedown", dragArgument);
	hintergrund.addEventListener("click", closeArgument);
	document.getElementById(argument).classList.toggle("hide");

	abfall.setAttribute("ondrop", "dropAbfall(event)")
	pult.setAttribute("ondrop", "dropPult(event)")
	istargumentoffen=1;
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

	document.addEventListener("dragover", moveCrt);

   for (i=1; i<11; i++){
	rad="arg"+i
		document.getElementById(rad).addEventListener("click", openArgument);
		document.addEventListener("keypress", preventEnter);


}
}



window.addEventListener("load", setup);
