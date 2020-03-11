'use strict';
/* eslint no-throw-literal: 0 */

const t = require('./libtap.cjs');

t.test('fail 1', async t => {
	t.fail('hello 1');
});

t.test('fail 2', async () => {
	throw 'hello 2';
});

t.test('fail 3', async () => {
	throw new Error('hello 3');
});

t.test('fail 4', () => {
	throw new Error('hello 4');
});

t.test('fail a', async t => {
	await t.test('fail a1', async t => {
		t.fail('hello a1');
	});
});

t.test('fail b', async t => {
	await t.test('fail b2', async () => {
		throw 'hello b2';
	});
});

t.test('fail c', async t => {
	await t.test('fail c3', async () => {
		throw new Error('hello c3');
	});
});

t.test('fail d', t => {
	t.plan(1);

	t.test('fail d4', () => {
		throw new Error('hello d4');
	});
});

t.test(async t => {
	t.fail('unnamed test');
});
