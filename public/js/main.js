var eulaStr = "";
var i =0;
var eulaArr;
var msg;
var renderArea = "#renderArea";
var remainSentences;

$(document).ready(function() {	
	$("#eula").load("eula.txt", function(){
		eulaStr = $("#eula").html();
		eulaArr = eulaStr.split(":break:");
	});
	
	soundManager.setup({
        url: '/',
        preferFlash: false,
        onready: function() {
          if (!window.GoogleTTS) {
            $("#error").text("Sorry, the google-tts script couldn't be loaded.");
            return;
          } else {
		  
			  // play
			  $("#btnPlay").click(function() {
				googleTTS.play($("#eula").text(), "en", function(err) {
				
					debugger;
				  if (err) {
					$("#error").text(err.toString());
				  }

				  console.log('Finished playing');
				});
				//debugger;
			  });

				var googleTTS = new window.GoogleTTS();
				
			  // available player
			  googleTTS.getPlayer(function (err, player) {
				if (err) {
				  return $("#error").text(err.toString());
				}

				if (player) {
				  $("#tts_player").text(player.toString());
				} else {
				  $("#tts_player").text('None available');
				}
			  });
		  }
	  }	
  });
	
});

function playEula(){
	$(renderArea).append("<span id='element" + i + "'></span>");
	$('#element' + i).typed({
		strings: [eulaArr[i]],
		typeSpeed: 0,
		contentType: 'html',
		showCursor: false,
		startDelay: 2000 //ms,
	});
	
	$("#frame").attr("src",'http://translate.google.com/translate_tts?tl=en&q=' + eulaStr);
	
	
	// msg = new SpeechSynthesisUtterance();
	
	// msg.onend = function(e) {
		// onEndSpeak(e);
	// };
	
	// if (eulaArr[i].length > 100){
		// if (eulaArr[i].indexOf('.') != -1){
			// // use period for delimiters
			// remainSentences = eulaArr[i].split('.');
		// }else if (eulaArr[i].indexOf(',') != -1){
			// // use coma for delimiters
			// remainSentences = eulaArr[i].split(',');
		// }
		
		// msg.text = remainSentences[0];
		// remainSentences.splice(0, 1);
		// window.speechSynthesis.speak(msg);
	// }else{
		// msg.text = eulaArr[i];
	
		// window.speechSynthesis.speak(msg);
	// }
}

function iAgree(){
	if (i < eulaArr.length){
		$("#agree").remove();
		playEula();
	}
}

function pauseEula(){
	window.speechSynthesis.pause();
}

function resumeEula(){
	window.speechSynthesis.resume();
}

function onEndSpeak(e){
	debugger;
	if (remainSentences.length > 0){
		// speak remains sentences if any
		msg = new SpeechSynthesisUtterance();
		
		msg.onend = function(e) {
			onEndSpeak(e);
		};
	
		msg.text = remainSentences[0];
		remainSentences.splice(0, 1);
		window.speechSynthesis.speak(msg);
	}else{
		i++;
		if (i < eulaArr.length){
			$(renderArea).append(" <a id='agree' href='#' onClick='iAgree()'>Next...</a>");
		}else{
			// do something where eula is finished reading
		}
	}
}

