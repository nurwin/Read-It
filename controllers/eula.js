exports.getEula = function(req, res) {
  res.render('eula', {
    title: 'Eula'
  });
};

exports.tryEula = function(req, res) {
  	var http = require('http');
	var fs = require('fs');

	var file = fs.createWriteStream("public/file.mp3");
	var request = http.get("http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q="+req.params.qry, function(response) {
		response.pipe(file);
	});
};

exports.streamEula = function(req, res) {
  	var http = require('http'),
    ms = require('mediaserver');
    var fs = require('fs');

	var file = fs.createReadStream("public/file.mp3");
	var request = http.get("http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=hellow+world", function(response) {
		ms.pipe(req, res, file.path);
	});
    
};
