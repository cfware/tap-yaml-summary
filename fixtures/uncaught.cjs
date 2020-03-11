'use strict';

const t = require('./libtap.cjs');

t.test('uncaught', t => {
	t.ok(true);
	t.end();

	setTimeout(() => {
		throw new Error('uncaught error');
	}, 1);
});
