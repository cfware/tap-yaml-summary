'use strict';

process.stdout.write(`TAP version 13
# Subtest: fail after success!?
    ok 1 - test 1
    1..1
not ok 1 - fail after success!? # time=2s

1..1
# time=2s
`);
