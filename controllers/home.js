/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.stream = function(req, response){
	console.log("MASUK");
	
	var qry = req.params.qry;
	console.log("qry: " + qry);
	qry = encodeURIComponent(qry);
	console.log("qry2: " + qry);
	var http = require('http');
	var options = {
	    host: "translate.google.com",
	    path: '/translate_tts?tl=en&q=' + qry,

	    method: 'GET'
  	};

  	var req = http.get(options, function(res) {
  			console.log('STATUS: ' + res.statusCode);
		  	console.log('HEADERS: ' + JSON.stringify(res.headers));
			console.log("Got response: " + res.statusCode);
			res.on('data', function(d) {
				response.write(d);
			});
			res.on('end', function() {
				response.end();
			});
		});
		
		console.log('HEADERS2: ' + JSON.stringify(req.headers));
	req.on('error', function(e) {
	  console.log('ERROR: ' + e.message);
	});
};