'use strict';

const t = require('./libtap.js');

t.test('extra', t => {
	console.log('extra 1\nextra 2');
	t.pass();
	t.end();
});
