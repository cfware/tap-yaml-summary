'use strict';

const t = require('./libtap.cjs');

t.test('pass 1', async t => {
	await t.test('pass 1a', async t => {
		t.pass('hello 1a');
	});
	t.pass('hello 1');
});

t.test('pass 2', async () => {});

t.test('pass 3', async t => {
	t.equal(1, 1);
	t.equal(1, 1);
});

t.test('pass 4', async t => {
	await t.test('pass 4a', async () => {});
});
