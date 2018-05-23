var net = require('net');

net.createServer(function (conn) {
	// 接收到连接，监听连接的数据
	conn.on('data', function (data) {
		conn.write([
			'HTTP/1.1 200 OK',
			'Content-Type: text/plain',
			'Content-Length: 11',
			'',
			'Hello World'
		].join('\n'));

		console.log(data.toString());
	})
}).listen(8080);