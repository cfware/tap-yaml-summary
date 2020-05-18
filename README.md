# tap-yaml-summary [![NPM Version][npm-image]][npm-url]

Output a summary in YAML format from a TAP stream

## Target User

This produces intentionally bare bones summaries.  The primary target is modules
with stable testing.  If you are looking for a pretty output look elsewhere.

## Command-line usage

```sh
tap test/*.js | tap-yaml-summary
```

## API

This module works as a transform stream

```js
const Reporter = require('tap-yaml-summary');

fs.createReadStream('saved-test-output.tap')
  .pipe(new Reporter().on('error', () => process.exit(1)))
  .pipe(process.stdout);
```

The `error` event is emitted on completion if any assertion failed or a bailout occurred.

## Attribution

This was based on `tap-mocha-reporter`.

[npm-image]: https://img.shields.io/npm/v/tap-yaml-summary.svg
[npm-url]: https://npmjs.org/package/tap-yaml-summary
