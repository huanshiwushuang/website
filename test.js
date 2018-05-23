process.on('message', function (msg) {
	console.log(`${msg.msg}`);
	process.send(msg.msg = 'hello father');
})