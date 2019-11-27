'use strict';

const {promisify} = require('util');
const t = require('./libtap.js');

const delay = promisify(setTimeout);

t.test('delay', async t => {
	await delay(1250);
	t.pass('delay complete');
});
