#!/usr/bin/env node

const path = require('node:path');
const {readFileSync, createReadStream} = require('node:fs');
const cp = require('node:child_process');
const {PassThrough} = require('node:stream');
const {promisify} = require('node:util');
const {test} = require('libtap');
const semver = require('semver');

const reporter = require.resolve('./bin.cjs');
const testInput = name => path.join(__dirname, 'fixtures', `${name}.txt`);
const delay = promisify(setTimeout);

function runSpawn(t, inputStream, expectStatus) {
	return new Promise((resolve, reject) => {
		const proc = cp.spawn(process.execPath, [reporter]);
		const stdout = [];
		const stderr = [];

		inputStream.pipe(proc.stdin);
		proc.stdout.on('data', buf => stdout.push(buf));
		proc.stderr.on('data', buf => stderr.push(buf));

		proc.on('error', reject);
		proc.on('close', status => {
			t.equal(status, expectStatus);
			let stdoutString = Buffer.concat(stdout).toString();
			if (t.name.startsWith('bail')) {
				// The tap bailout does not specify timing so it fluctuates.
				stdoutString = stdoutString.replace(/duration: \d*/u, 'duration: removed');
			}

			t.matchSnapshot(stdoutString, 'stdout');
			t.equal(Buffer.concat(stderr).toString(), '');

			resolve();
		});
	});
}

const tests = {
	bail1: 1,
	bail2: 1,
	extra: 0,
	fail: 1,
	'not-ok-suite': 1,
	pass: 0,
	pending: 0,
	slow: 0,
	uncaught: 1
};

for (const [name, status] of Object.entries(tests)) {
	test(name, async t => {
		await runSpawn(t, createReadStream(testInput(name)), status);
	});
}

test('slow stdin', async t => {
	const slow = readFileSync(testInput('slow'), 'utf8').split('\n');
	const stream = new PassThrough();
	const promise = runSpawn(t, stream, 0);

	for (const line of slow) {
		stream.write(`${line}\n`);

		// eslint-disable-next-line no-await-in-loop
		await delay(50);
	}

	stream.end();

	await promise;
});

if (semver.gte(process.versions.node, '13.10.0')) {
	test('test exports', async t => {
		const index = require('./index.cjs');
		const selfRef = require('tap-yaml-summary');

		t.equal(index, selfRef);
	});
}
