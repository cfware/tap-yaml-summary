'use strict';

const settings = require('libtap/settings');

/* Block stuff that might interfere with error snapshots */
settings.stackUtils.internals.push(/node_modules/, /^\s*at internal\//);

module.exports = require('libtap');
