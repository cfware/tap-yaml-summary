'use strict';

const t = require('libtap');
const StackUtils = require('stack-utils');

let nodeInternals = [];
try {
	nodeInternals = StackUtils.nodeInternals();
} catch (_) {
}

/* Block stuff that might interfere with error snapshots */
const ignore = [/node_modules/, /^\s*at internal\//];
t.stackUtils = new StackUtils({internals: [].concat(nodeInternals, ignore)});

module.exports = t;
