'use strict';

const t = require('./libtap.js');

t.test('bail', async t => {
	t.bailout('bail');
});
