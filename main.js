var fs = require('fs');
var pathname = process.argv.slice(2);
var rs = fs.createReadStream(pathname[0]);

rs.on('data', function (chunk) {
	console.log(chunk);
})

rs.on('end', function () {
	// cleanUp();
	console.log("END");
})

