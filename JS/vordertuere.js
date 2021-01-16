var hintergrund=document.getElementById("hintergrund");

function klopfen (){
	document.getElementById("AV-klopfen").play();
	document.getElementById("AV-klopfen").addEventListener("ended", function (){
		location.assign("wecker_2.html");
	});
}

function setup() {
    hintergrund.addEventListener("click",klopfen);
	
}

window.addEventListener("load", setup);