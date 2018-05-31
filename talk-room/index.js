// 模块依赖
var net = require('net');
var nowCount = 0;

// 创建服务器

var server = net.createServer(function (conn) {
	console.log('新的连接收到');
})

// 监听端口
server.listen(3000, function () {
	console.log('端口监听在 3000');
})
