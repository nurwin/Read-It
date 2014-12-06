$(document).ready(function() {
	  var sentence = 'First sentence Second sentence';
  	  var audio = new Audio();
	  audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=en&q='+sentence+"&qwe="+new Date().getTime();
	  audio.play();
      $(".element").typed({
        strings: [sentence],
        typeSpeed: 0
      });
});
