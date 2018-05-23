var http = require('http'),
	fs = require('fs'),
	path = require('path');

var MIME = {
	'.css': 'text/css',
	'.js': 'application/javascript'
};

main(process.argv.slice(2));

function main(argv) {
	var config = JSON.parse((argv[0] && fs.readFileSync(argv[0], 'utf-8')) || '{}'),
		root = config.root || '.',
		port = config.port || 80;

	http.createServer(function (req, res) {
		// var pathInfo = parseUrl(root, req.url);
		console.log(req.url);
		res.end('123');
	}).listen(8080);
}

function parseUrl(root, url) {
	if (url.indexOf('??') != -1) {
		url = url.replace('/', '/??');
	}


}


