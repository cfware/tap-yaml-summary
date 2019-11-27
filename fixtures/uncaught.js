'use strict';

const t = require('./libtap.js');

t.test('uncaught', t => {
	t.ok(true);
	t.done();

	setTimeout(() => {
		throw new Error('uncaught error');
	}, 1);
});
