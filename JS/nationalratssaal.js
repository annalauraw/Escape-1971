
var argumentgross=document.getElementById("argumentgross");
var pult=document.getElementById("pult");
var abfall=document.getElementById("abfall");
var hintergrund=document.getElementById("hintergrund");
var istargumentoffen=null;

for (i=1; i<11; i++){
	this ["arg"+i]=document.getElementById("arg"+i);
	
}

function allowDrop(ev){
	ev.preventDefault();
	
}

function checkElements(number){
	var check=document.getElementsByClassName("argument");
	
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

function dropAbfall(){
	
	if (test < 6){
		//alert("Korrekt");
		document.getElementById('AV-reissen').play();
		document.getElementById(argument).remove();
		closeArgument();
		checkElements(2);
	}
}
function dropPult(){
	
	if (test > 5){
		//alert("Korrekt");
		document.getElementById('AV-applaus').play();
		document.getElementById(argument).remove();
		closeArgument();
		checkElements(3);
	}
	
}

function dragArgument(event){
	//console.log("YES");
	//argument=event.target.id;
	
	//ev.dataTransfer.setData("text", "junk");
	var img = document.createElement("img");
    img.src = "Bilder/bilder/"+argument+".png";
    event.dataTransfer.setDragImage(img, 200, 200);

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
	
	abfall.setAttribute("ondrop", "dropAbfall()")
	pult.setAttribute("ondrop", "dropPult()")
	istargumentoffen=1;
}



function setup() {
	
   for (i=1; i<11; i++){
	rad="arg"+i 
		document.getElementById(rad).addEventListener("click", openArgument);
	
}
}

window.addEventListener("load", setup);