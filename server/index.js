/*jslint node: true */

'use strict';
var express = require('express');
var parser = require('body-parser');
var cmd = require('node-cmd');

cmd.get('npx cypress run', function(err, data, stderr) {
	if (err) {
		console.log('error:');
		console.log(err);
	}
	console.log('the current dir contains these files :\n\n', data);
	process.exit();
});

// create instance of the server to variable app
var app = express();

// get method for parsing body
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use('/', express.static('client/'));

// direct all other routes to client-side app
app.all('/*', function(req, res) {
	res
		.status(200)
		.set({ 'content-type': 'text/html; charset=utf-8' })
		.sendFile(process.cwd() + '/client/index.html');
});

// have our app listen on port 3000
app.listen(process.env.PORT || 3000, function() {
	console.log('Service on running on 3000');
});
