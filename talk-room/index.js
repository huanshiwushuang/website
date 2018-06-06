// 模块依赖
var net = require('net');
var nowCount = 0,
	users = {};

// 创建服务器

var server = net.createServer(function (conn) {
	conn.setEncoding('utf8');
	nowCount++;

	conn.write('\nsuccess, you are number: '+nowCount);
	conn.write('\nplease enter your nickname：');
	conn.on('data', function (data) {
		data = data.replace('\r\n','');
		if (users[data]) {
			conn.write('\nnickname already exists, please enter your nickname：');
		} else {
			// 新用户登录
			for (let i in users) {
				i.write('user '+data+' login');
			}
			users[conn] = {};
			users[conn].nickname = data;
		}
		console.log(data);
	})
	conn.on('end', function (data) {
		console.log(data);
	})
	conn.on('error', function (error) {
		console.log('\n\x1b[31;47mError Info:\x1b[0m');
		console.log(`\t${error}\n`);
	})
	conn.on('close', function () {
		debugger
		console.log('connection disconnect，current number：'+(--nowCount));
	})
})

// 监听端口
server.listen(3000, function () {
	console.log('正在监听端口 3000');
})

