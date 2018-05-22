var argv = require('argv'),
	echo = require('../lib/echo');

console.log(echo(argv.run().targets.join(' ')));



