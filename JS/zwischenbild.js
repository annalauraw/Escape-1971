var ruth=document.getElementById("ruth");

function sprechen (){
	document.getElementById("ton").play();
	document.getElementById("ton").addEventListener("ended", function (){
		location.assign("wecker_1.html");
	});
}

function setup() {
    ruth.addEventListener("click", sprechen);
	
}

window.addEventListener("load", setup);