var fs = require('fs'),
	path = require('path');

function replace(pathname) {
	var str = fs.readFileSync(pathname, 'binary');
	console.log(fs.readFileSync(pathname));
	console.log(str);
	str = str.replace('gbk', 'hahaha');
	console.log(str);
	fs.writeFileSync(pathname, 'binary');
}

replace('./gbk.txt');