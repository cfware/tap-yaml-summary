'use strict';

const path = require('path');
const MiniPass = require('minipass');
const Parser = require('tap-parser');
const yaml = require('tap-yaml');

class Suite {
	constructor() {
		this.ok = true;
	}
}

// $1 = number, $2 = units
const timere = /^#\s*time=((?:0|[1-9]\d*?)(?:\.\d+)?)(ms|s)?$/;
const cwd = path.join(process.cwd(), '/');

class Runner extends MiniPass {
	constructor() {
		super();
		this.parser = new Parser();
		this.startTime = new Date();
		this.stats = {
			bailout: undefined,
			passes: 0,
			pending: 0,
			failures: []
		};

		this.parser.on('complete', () => {
			const {stats} = this;

			if (!stats.duration) {
				stats.duration = new Date() - stats.start;
			}

			this.report();
			super.end();
			if (!this.ok) {
				this.emit('failed');
			}
		});

		this.parser.on('comment', c => {
			const tmatch = c.trim().match(timere);
			if (tmatch) {
				let t = Number(tmatch[1]);
				if (tmatch[2] === 's') {
					t *= 1000;
				}

				this.parser.time = t;
				this.stats.duration = t;
			}
		});

		this.attachEvents(this.parser, 0);
	}

	report() {
		const {failures, bailout, passes, pending, duration} = this.stats;
		const results = {};
		if (failures.length > 0) {
			results.failures = failures.map(result => {
				if (result.diag && result.diag.stack) {
					result.diag.stack = result.diag.stack.split('\n')
						.map(l => l.trim().replace(cwd, '')).join('\n');
				}

				return result;
			});
			results.failureCount = failures.length;
		}

		if (bailout) {
			results.bailout = bailout;
		}

		results.passes = passes;
		if (pending) {
			results.pending = pending;
		}

		results.duration = duration;

		super.write(yaml.stringify(results));
	}

	write(...args) {
		if (!this.emittedStart) {
			this.emittedStart = true;
			this.stats.start = new Date();
		}

		return this.parser.write(...args);
	}

	end(...args) {
		return this.parser.end(...args);
	}

	attachEvents(parser, level) {
		parser.emittedSuite = false;
		parser.didAssert = false;
		parser.name = parser.name || '';
		parser.doingChild = null;

		parser.on('complete', res => {
			if (!res.ok) {
				const {count} = res;
				const plan = res.plan.end - res.plan.start + 1;
				if (count === plan) {
					// Probably handled on child parser
					return;
				}

				this.emitTest(parser, {
					ok: false,
					name: 'test count !== plan'
				});
			}
		});

		parser.on('child', childParser => {
			childParser.parent = parser;
			this.attachEvents(childParser, level + 1);

			// If we're in a suite, but we haven't emitted it yet, then we
			// know that an assert will follow this child, even if there are
			// no others. That means that we will definitely have a 'suite'
			// event to emit.
			this.emitSuite(childParser);

			parser.didAssert = true;
			parser.doingChild = childParser;
		});

		// Just dump all non-parsing stuff
		parser.on('extra', c => {
			super.write(c.split('\n').map(l => l ? `> ${l}` : l).join('\n'));
		});

		parser.on('assert', result => {
			this.emitSuite(parser);

			// No need to print the trailing assert for subtests
			// UNLESS, there were no other asserts, AND it's root level
			if (parser.doingChild) {
				const {suite, name} = parser.doingChild;
				if (suite && name === result.name) {
					// If it's ok so far, but the ending result is not-ok, then
					// that means that it exited non-zero.  Emit the test so
					// that we can print it as a failure.
					if (suite.ok && !result.ok) {
						this.emitTest(parser, result);
					}
				}

				let emitOn = parser;
				const dc = parser.doingChild;
				parser.doingChild = null;

				if (!dc.didAssert && dc.level === 1) {
					emitOn = dc;
				} else if (dc.didAssert) {
					return;
				}

				this.emitSuite(emitOn);
				this.emitTest(emitOn, result);
				if (emitOn !== parser && emitOn.suite) {
					delete emitOn.suite;
				}

				return;
			}

			parser.didAssert = true;
			parser.doingChild = null;

			this.emitTest(parser, result);
		});

		parser.on('bailout', reason => {
			this.stats.bailout = reason;

			const {suite} = parser;
			if (suite) {
				parser.suite = suite.parent;
			}
		});

		const streamEvents = [
			'pipe', 'prefinish', 'finish', 'unpipe', 'close'
		];

		streamEvents.forEach(ev => {
			parser.on(ev, /* istanbul ignore next */(...args) => this.emit(ev, ...args));
		});
	}

	emitSuite(parser) {
		if (!parser.emittedSuite && parser.name) {
			parser.emittedSuite = true;
			parser.suite = new Suite();
		}
	}

	emitTest(parser, result) {
		if (parser.suite) {
			if (!result.ok) {
				for (let p = parser; p && p.suite; p = p.parent) {
					p.suite.ok = false;
				}
			}

			parser.suite.ok = parser.suite.ok && result.ok;
		}

		if (result.skip || result.todo) {
			this.stats.pending++;
		} else if (result.ok) {
			this.stats.passes++;
		} else {
			this.stats.failures.push(result);
		}
	}

	get ok() {
		return Boolean(this.parser && this.parser.ok);
	}
}

module.exports = Runner;
