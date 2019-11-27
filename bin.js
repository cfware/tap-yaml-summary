#!/usr/bin/env node

const Reporter = require('.');

process.stdin
	.pipe(new Reporter().on('failed', () => process.exit(1)))
	.pipe(process.stdout);
