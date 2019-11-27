#!/usr/bin/env node

const path = require('path');
const {readFileSync, createReadStream} = require('fs');
const cp = require('child_process');
const {PassThrough} = require('stream');
const {promisify} = require('util');
const {test} = require('libtap');

const reporter = require.resolve('./bin.js');
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
			t.is(status, expectStatus);
			let stdoutStr = Buffer.concat(stdout).toString();
			if (t.name.startsWith('bail')) {
				// The tap bailout does not specify timing so it fluctuates.
				stdoutStr = stdoutStr.replace(/duration: \d*/, 'duration: removed');
			}

			t.matchSnapshot(stdoutStr, 'stdout');
			t.is(Buffer.concat(stderr).toString(), '');

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
