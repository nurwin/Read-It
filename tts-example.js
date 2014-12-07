tts = require('node-tts-api');

example = "Hello World";

tts.getSpeech(example, function(error, link) {
  return console.log(link);
});