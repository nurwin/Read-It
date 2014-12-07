var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("file.mp3");
var request = http.get("http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=This%20Statement%20of%20Rights%20and%20Responsibilities%20(Statement%2C", function(response) {
  response.pipe(file);
});