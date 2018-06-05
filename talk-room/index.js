// 模块依赖
var net = require('net');
var nowCount = 0;

// 创建服务器

var server = net.createServer(function (conn) {
	conn.write(
		'\n > welcome to \x1b[92m talk-room \x1b[39m'
		+'\n > '
		+(++nowCount)
		+' other people are connected at this time.'
		+'\n > please write your name and press enter:'
	);
	conn.on('close', function () {
		nowCount--;
	})
})

// 监听端口
server.listen(3000, function () {
	console.log('端口监听在 3000');
})
