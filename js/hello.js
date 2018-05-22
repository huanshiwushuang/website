function log(a){console.log(a)}

const hello = require('./hello');
const hello2 = require('./hello.js');
const hello3 = require('/yaozhAP/www/www.guohao.com/js/hello');
log(hello);
log(hello2);
log(hello3);

const data = require('../assets/data.json');
log(data);

exports.hello = function () {
	log('this is hello');
}
