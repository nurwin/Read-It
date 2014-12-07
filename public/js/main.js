var eulaStr = "";
var i =0;
var eulaArr;
var msg;
var renderArea = "#renderArea";
var remainSentences;
var typingArea;
var focus = false;
var eula;

var testTyper;

$(document).ready(function() {	
	testTyper = $('#test');

    // testTyper.typer(['<a class="h1">Anyone</a> <br/><a class="h2">is</a> <a class="a">awesome!</a>']);

	$("#eula").load("eula-encode.xml", function(){
		eula = $.parseXML($("#eula").html());
		debugger;
		//$("#lastUpdate").text($(eula).find("lastupdate").text());
		//$("#title").text($(eula).find("title").text());
		eulaStr = decodeURIComponent($(eula).find("page").first().text().trim());
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

				var googleTTS = new window.GoogleTTS();
		  
			  // play
			  $("#btnPlay").click(function() {
				googleTTS.play(eulaStr, "en", function(err) {
				
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
		  
			  // pause
			  $("#btnMute").click(function() {
				toggleVolume();
			  });
		  
			  // resume
			  $("#btnResume").click(function() {
				resumeEula();
			  });
				
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
	if (i > 0){
		audios[i-1].play();
		$("#element" + (i-1)).play();
	}
}

function toggleVolume(){
	if (i > 0){
		if (audios[i-1].muted == ""){
			muted = "muted";
			$("#btnMute").val("Unmute");
		}else{
			muted = "";
			$("#btnMute").val("Mute");
		}
		
		audios[i-1].muted = muted;
		$("#element" + (i-1)).play();
	}
	audios[i-1].play();
}

