var fs = require(`fs`),
	path = require(`path`),
	 _dirname = process.cwd(),
	stdin = process.stdin,
	stdout = process.stdout;

fs.readdir(_dirname, function (err, files) {
	var statsArr = [];
	if (err) {
		return console.log(`${err.message}`);
	} if (!files.length) {
		return console.log(`No files to show!`);
	}
	console.log(`Select which file or directory you want to see:`);
	function file(i) {
		var filename = files[i];
		fs.stat(path.join(_dirname,filename), function (err, stats) {
			statsArr.push(stats);
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
				read();
			} else {
				file(i);
			}
		})
	}
	function read() {
		console.log(``);
		stdout.write(`Enter your choice: `);
		stdin.resume();
		stdin.setEncoding('utf8');

		stdin.on('data', option);
	}
	function option(data) {
		if (!files[Number(data-1)]) {
			stdout.write(`\t \x1b[31m Enter your choice: \x1b[0m`);
		} else {
			stdin.pause();

			fs.readFile(path.join(_dirname, files[Number(data-1)]), 'utf8', function (err, data) {
				console.log();
				console.log(`\x1b[90m ${data.replace(/(.*)/g,'\t$1')} \x1b[0m`);
			})
		}
	}     
	file(0);
})
