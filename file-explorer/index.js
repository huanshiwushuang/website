var fs = require(`fs`);
var path = require(`path`);
var _dirname = process.cwd();

console.log(process.stdin.setEncoding('utf8'));
fs.readdir(_dirname, function (err, files) {
	if (err) {
		return console.log(`${err.message}`);
	} if (!files.length) {
		return console.log(`No files to show!`);
	}
	console.log(`Select which file or directory you want to see:`);
	function file(i) {
		var filename = files[i];
		fs.stat(path.join(_dirname,filename), function (err, stats) {
			if (err) {
				return console.log(err.message);
			}
			if (stats.isDirectory()) {
				console.log(`\t \x1b[31;47m ${i+1}  ${filename}/ \x1b[0m`);
			} else {
				console.log(`\t \x1b[32;47m ${i+1} ${filename} \x1b[0m`);
			}
			i++;
			if (i == files.length) {
				console.log(``);
				process.stdout.write(`Enter your choice: `);
				process.stdin.resume();
			} else {
				file(i);
			}
		})
	}
	file(0);
})
