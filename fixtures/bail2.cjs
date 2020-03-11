'use strict';

const t = require('./libtap.cjs');

t.test('bail', async t => {
	t.pass('1');
	t.bailout('bail');
});
