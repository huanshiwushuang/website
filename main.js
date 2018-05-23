var util = require('util');

function log() {
    process.stdout.write(
    	util.format.apply(util,arguments)
    );
}

log('asd asd123 fds');