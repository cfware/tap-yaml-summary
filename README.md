# tap-yaml-summary

[![Travis CI][travis-image]][travis-url]
[![Greenkeeper badge][gk-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT][license-image]](LICENSE)

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
  .pipe(new Reporter().on('failed', () => process.exit(1)))
  .pipe(process.stdout);
```

The `failed` event is emitted on completion if any assertion failed or a bailout occurred.

## Attribution

This was based on `tap-mocha-reporter`.

[npm-image]: https://img.shields.io/npm/v/tap-yaml-summary.svg
[npm-url]: https://npmjs.org/package/tap-yaml-summary
[travis-image]: https://travis-ci.org/cfware/tap-yaml-summary.svg?branch=master
[travis-url]: https://travis-ci.org/cfware/tap-yaml-summary
[gk-image]: https://badges.greenkeeper.io/cfware/tap-yaml-summary.svg
[downloads-image]: https://img.shields.io/npm/dm/tap-yaml-summary.svg
[downloads-url]: https://npmjs.org/package/tap-yaml-summary
[license-image]: https://img.shields.io/npm/l/tap-yaml-summary.svg
