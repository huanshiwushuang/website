// 模块依赖
var net = require('net');
var nowCount = 0,
	users = {};

// 创建服务器

var server = net.createServer(function (conn) {
	var nickname;
	nowCount++;

	conn.write('\r\nsuccess, you are number: '+nowCount);
	conn.write('\r\nplease enter your nickname：');
	conn.on('data', function (data) {
		let tmp;
		data = Buffer.from(data.join(',').replace(/,?(10|13)\b/g,'').split(','));
		tmp = data.join(',');
		if (nickname) {
			if (data.toString() == 'getNickName') {
				conn.write('\x1b[32m your nickname is '+Buffer.from(nickname.split(','))+'\x1b[0m');
			} else {
				conn.write('\r\nyour input is '+data);
			}
		} else {
			if (users[tmp]) {
				conn.write('\r\n\x1b[31mnickname already exists, please enter your nickname：');
			} else {
				nickname = tmp;
				// 新用户登录，广播所有在线用户
				for (let i in users) {
					users[i].conn.write('\r\nnew user '+data+' login!');
				}
				users[nickname] = {};
				users[nickname].conn = conn;
			}
		}
	})
	conn.on('error', function (error) {
		console.log('\n\x1b[31;47mError Info:\x1b[0m');
		console.log(`\t${error}\n`);
	})
	conn.on('close', function () {
		console.log('connection disconnect, current number：'+(--nowCount));
		// 断开的时候，删除保存的用户
		delete users[nickname]
	})
})
// 监听端口
server.listen(3000, function () {
	console.log('正在监听端口 3000');
})

