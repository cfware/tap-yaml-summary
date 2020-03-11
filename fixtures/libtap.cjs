'use strict';

const settings = require('libtap/settings');

/* Block stuff that might interfere with error snapshots */
settings.stackUtils.internals.push(/node_modules/u, /^\s*at internal\//u);

module.exports = require('libtap');
