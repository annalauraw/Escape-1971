
var argumentgross=document.getElementById("argumentgross");
var pult=document.getElementById("pult");
var abfall=document.getElementById("abfall");
var hintergrund=document.getElementById("hintergrund");
var istargumentoffen=null;

for (i=1; i<12; i++){
	this ["arg"+i]=document.getElementById("arg"+i);
	
}

function allowDrop(ev){
	ev.preventDefault();
}

function dropAbfall(){
	
	if (test < 6){
		//alert("Korrekt");
		document.getElementById('AV-reissen').play();
		document.getElementById(argument).remove();
		closeArgument();
	}
}
function dropPult(){
	if (test > 5){
		//alert("Korrekt");
		document.getElementById('AV-applaus').play();
		document.getElementById(argument).remove();
		closeArgument();
	}
	
}

function dragArgument(){
	console.log("YES");

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
	test=argument.replace("arg","");
	
	
	argumentgross.addEventListener("onmousedown", dragArgument);
	hintergrund.addEventListener("click", closeArgument);
	document.getElementById(argument).classList.toggle("hide");
	
	abfall.setAttribute("ondrop", "dropAbfall()")
	pult.setAttribute("ondrop", "dropPult()")
	istargumentoffen=1;
}



function setup() {
    
   for (i=1; i<12; i++){
	rad="arg"+i 
		document.getElementById(rad).addEventListener("click", openArgument);
	
}
}

window.addEventListener("load", setup);