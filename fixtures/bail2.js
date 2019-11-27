'use strict';

const t = require('./libtap.js');

t.test('bail', async t => {
	t.pass('1');
	t.bailout('bail');
});
