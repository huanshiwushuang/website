var http = require('http');

var server = http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.end('<marquee style="font-size:50px">蒋二娃是SB</marquee>');
})

server.listen(8080);