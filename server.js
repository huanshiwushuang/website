var http = require('http'),
	fs = require('fs'),
	path = require('path');

var MIME = {
	'.css': 'text/css',
	'.js': 'application/javascript'
};

main(process.argv.slice(2));

function main(argv) {
	var config = JSON.parse((argv[0] && fs.readFileSync(argv[0], 'utf-8')) || '{}'),
		root = config.root || '.',
		port = config.port || 80,
		server;

	server = http.createServer(function (req, res) {
		var pathInfo = parseUrl(root, req.url);

		if (pathInfo.err) {
			res.writeHead(404);
			res.end(pathInfo.err.message);
			console.log(pathInfo.err.message);
		} else {
			validateFiles(pathInfo.pathnames, function (err,pathnames) {
				if (err) {
					res.writeHead(404);
					res.end(err.message);
				} else {
					res.writeHead(200, {
						'Content-Type': pathInfo.mime
					})
					outputFile(pathnames,res);
				}
			})
			
		}
	}).listen(port);

	process.on('SIGTERM', function () {
		server.close(function () {
			process.exit(0);
		})
	})
}
function validateFiles(pathnames, callback) {
	(function next(i, len) {
		if (i < len) {
 			fs.stat(pathnames[i], function (err, stats) {
 				if (err) {
 					callback(err);
 				} else if (!stats.isFile()) {
 					callback(new Error('Not File'));
 				} else {
 					next(i+1, len);
 				}
 			})
		} else {
			callback(null, pathnames);
		}
	})(0,pathnames.length)
}
function outputFile(pathnames, writer) {
	(function next(i,len) {
		if (i < len) {
			let reader = fs.createReadStream(pathnames[i]);
			reader.pipe(writer, {end: false});
			reader.on('end', function () {
				next(i+1, len);
			})
		} else {
			writer.end();
		}
	})(0,pathnames.length)
}
function parseUrl(root, url) {
	console.log(url);
	var base,parts,pathnames;

	if (url.indexOf('??') != -1) {
		url = url.replace('/', '/??');
	}
	parts = url.split('/??');
	try {
		base = path.join('/',parts[1]);
	} catch (e) {

		return {
			err: e
		}
	}
	pathnames = parts[2].split(',').map(function (item) {
		return path.join(root,base,item);
	})

	return {
		mime: MIME[path.extname(pathnames[0])] || 'text/plain',
		pathnames: pathnames
	}
}




// http://assets.example.com/foo/??bar.js,baz.js
// http://assets.example.com/foo/bar.js

