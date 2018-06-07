var net = require('net');

var client = net.connect(3000, '127.0.0.1')

client.on('connect', function () {
	console.log('连接成功');
})
client.on('data', function (data) {
	console.log('收到数据：');
	console.log(data.toString());
})
client.on('close', function () {
	console.log('连接关闭');
})