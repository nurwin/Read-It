var eulaStr = "";
var i =0;
var eulaArr;
var msg;
var renderArea = "#renderArea";
var remainSentences;
var typingArea;
var focus = false;
var testTyper;

$(document).ready(function() {	
	testTyper = $('#test');

    // testTyper.typer(['<a class="h1">Anyone</a> <br/><a class="h2">is</a> <a class="a">awesome!</a>']);

	$("#eula").load("eula.txt", function(){
		eulaStr = $("#eula").html();
		eulaArr = eulaStr.split(":break:");
	});
	
	$(window).blur(function(){
		focus = false;
		pauseEula();
	});
	
	$(window).focus(function(){
		if (!focus){
			resumeEula();
			focus = true;
		}
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
				
				  if (err) {
					$("#error").text(err.toString());
				  }

				  console.log('Finished playing');
				});
					
			  });
		  
			  // pause
			  $("#btnPause").click(function() {
				pauseEula();
			  });
		  
			  // resume
			  $("#btnResume").click(function() {
				resumeEula();
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

function iAgree(){
	if (i < eulaArr.length){
		$("#agree").remove();
		playEula();
	}
}

function pauseEula(){
	if (i > 0){
		audios[i-1].pause();
		// $("#element" + (i-1)).pause();
	}
}

function resumeEula(){
	audios[i-1].play();
	// $("#element" + (i-1)).play();
}

