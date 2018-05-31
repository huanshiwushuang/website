var http = require('http');

var server = http.Server(function (req, res) {
	console.log(1);
	res.end('123');
});

server.listen(3000);