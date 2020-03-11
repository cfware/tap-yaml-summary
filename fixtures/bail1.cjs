'use strict';

const t = require('./libtap.cjs');

t.test('bail', async t => {
	t.bailout('bail');
});
