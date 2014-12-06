var eulaStr = "";
var i =0;
var eulaArr;
$(document).ready(function() {
	$(".element").text("");
	
	$("#eula").load("eula.txt", function(){
		eulaStr = $("#eula").text();
		eulaArr = eulaStr.split(".");
	});
	
});

function playEula(){
	$(".element").typed({
		strings: [eulaArr[i]],
		typeSpeed: 0,
		startDelay: 2000 //ms
	});
	
	var msg = new SpeechSynthesisUtterance(eulaArr[i]);
	msg.onend = function(e) {
		i++;
		$(".element").append(" <a id='agree' href='#' onClick='iAgree()'>I Agree</a>");
	};
    window.speechSynthesis.speak(msg);
}

function iAgree(){
	$("#agree").remove();
	playEula();
}

