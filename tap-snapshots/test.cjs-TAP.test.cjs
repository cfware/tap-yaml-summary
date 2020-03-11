/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test.cjs TAP bail1 > stdout 1`] = `
failures:
  - ok: false
    name: test count !== plan
failureCount: 1
bailout: bail
passes: 0
duration: removed

`

exports[`test.cjs TAP bail2 > stdout 1`] = `
bailout: bail
passes: 1
duration: removed

`

exports[`test.cjs TAP extra > stdout 1`] = `
> extra 1
> extra 2
passes: 1
duration: 6.227

`

exports[`test.cjs TAP fail > stdout 1`] = `
failures:
  - ok: false
    id: 1
    name: hello 1
    diag:
      at:
        line: 7
        column: 4
        file: fail.cjs
        type: Test
      stack: |
        Test.<anonymous> (fail.cjs:7:4)
        Object.<anonymous> (fail.cjs:6:3)
      source: |
        t.test('fail 1', async t => {
        	t.fail('hello 1');
        ---^
        });
    fullname: fail 1
  - ok: false
    id: 1
    name: (unnamed test)
    diag:
      stack: |
        Object.<anonymous> (fail.cjs:10:3)
      error: hello 2
      tapCaught: returnedPromiseRejection
      test: fail 2
      at:
        line: 10
        column: 3
        file: fail.cjs
        function: Object.<anonymous>
      source: |
        
        t.test('fail 2', async () => {
        --^
        	throw 'hello 2';
        });
    fullname: fail 2
  - ok: false
    id: 1
    name: hello 3
    diag:
      stack: |
        Test.<anonymous> (fail.cjs:15:8)
      at:
        line: 15
        column: 8
        file: fail.cjs
        function: Test.<anonymous>
      tapCaught: returnedPromiseRejection
      test: fail 3
      source: |
        t.test('fail 3', async () => {
        	throw new Error('hello 3');
        -------^
        });
    fullname: fail 3
  - ok: false
    id: 1
    name: hello 4
    diag:
      stack: |
        Test.<anonymous> (fail.cjs:19:8)
      at:
        line: 19
        column: 8
        file: fail.cjs
        function: Test.<anonymous>
      tapCaught: testFunctionThrow
      test: fail 4
      source: |
        t.test('fail 4', () => {
        	throw new Error('hello 4');
        -------^
        });
    fullname: fail 4
  - ok: false
    id: 1
    name: hello a1
    diag:
      at:
        line: 24
        column: 5
        file: fail.cjs
        type: Test
      stack: |
        Test.<anonymous> (fail.cjs:24:5)
        Test.<anonymous> (fail.cjs:23:10)
      source: |
        	await t.test('fail a1', async t => {
        		t.fail('hello a1');
        ----^
        	});
        });
    fullname: fail a fail a1
  - ok: false
    id: 1
    name: (unnamed test)
    diag:
      stack: |
        Test.<anonymous> (fail.cjs:29:10)
      error: hello b2
      tapCaught: returnedPromiseRejection
      test: fail b2
      at:
        line: 29
        column: 10
        file: fail.cjs
        function: Test.<anonymous>
      source: |
        t.test('fail b', async t => {
        	await t.test('fail b2', async () => {
        ---------^
        		throw 'hello b2';
        	});
    fullname: fail b fail b2
  - ok: false
    id: 1
    name: hello c3
    diag:
      stack: |
        Test.<anonymous> (fail.cjs:36:9)
      at:
        line: 36
        column: 9
        file: fail.cjs
        function: Test.<anonymous>
      tapCaught: returnedPromiseRejection
      test: fail c3
      source: |
        	await t.test('fail c3', async () => {
        		throw new Error('hello c3');
        --------^
        	});
        });
    fullname: fail c fail c3
  - ok: false
    id: 1
    name: hello d4
    diag:
      stack: |
        Test.<anonymous> (fail.cjs:44:9)
      at:
        line: 44
        column: 9
        file: fail.cjs
        function: Test.<anonymous>
      tapCaught: testFunctionThrow
      test: fail d4
      source: |
        	t.test('fail d4', () => {
        		throw new Error('hello d4');
        --------^
        	});
        });
    fullname: fail d fail d4
  - ok: false
    id: 1
    name: unnamed test
    diag:
      at:
        line: 49
        column: 4
        file: fail.cjs
        type: Test
      stack: |
        Test.<anonymous> (fail.cjs:49:4)
      source: |
        t.test(async t => {
        	t.fail('unnamed test');
        ---^
        });
    fullname: ""
failureCount: 9
passes: 0
duration: 54.891

`

exports[`test.cjs TAP not-ok-suite > stdout 1`] = `
failures:
  - ok: false
    id: 1
    time: 2000
    name: fail after success!?
    fullname: ""
failureCount: 1
passes: 1
duration: 2000

`

exports[`test.cjs TAP pass > stdout 1`] = `
passes: 6
duration: 11.332

`

exports[`test.cjs TAP pending > stdout 1`] = `
passes: 0
pending: 2
duration: 3.536

`

exports[`test.cjs TAP slow > stdout 1`] = `
passes: 1
duration: 1261.186

`

exports[`test.cjs TAP slow stdin > stdout 1`] = `
passes: 1
duration: 1261.186

`

exports[`test.cjs TAP uncaught > stdout 1`] = `
failures:
  - ok: false
    id: 2
    name: uncaught error
    diag:
      at:
        line: 10
        column: 9
        file: uncaught.cjs
        function: Timeout._onTimeout
      stack: |
        Timeout._onTimeout (uncaught.cjs:10:9)
      tapCaught: uncaughtException
      test: TAP
      source: |
        	setTimeout(() => {
        		throw new Error('uncaught error');
        --------^
        	}, 1);
        });
    fullname: ""
failureCount: 1
passes: 1
duration: 15.089

`
