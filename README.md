# ember-cli-array-sequence

[![master branch build status](https://travis-ci.org/j-/ember-cli-array-sequence.svg?branch=master)](https://travis-ci.org/j-/ember-cli-array-sequence)

Ember CLI array sequence addon.

`ember-cli-array-sequence` exposes an [Ember][ember] [MutableArray][mutable]
subclass which will generate a sequence of numbers when its length is updated.

## Example

```js
import ArraySequence from 'array-sequence';

var seq = ArraySequence.create({
	offset: 1,
	length: 3
});

console.log(seq.toArray()); // [1, 2, 3]
seq.set('length', 5);
console.log(seq.toArray()); // [1, 2, 3, 4, 5]
```

## Properties

**`offset`**: Number (optional, default = `0`)

An offset value to add to each item. Use 0 for zero-based and 1 for one-based
sequences etc.

**`length`**: Number (optional, default = `0`)

Length of sequence which can be written and read.

## Installing

With [npm][npm]:

```sh
$ npm install --save ember-cli-array-sequence
```

Or with [Ember CLI][cli]:

```sh
$ ember install:npm ember-cli-array-sequence
```

## License

[MIT license](LICENSE.md).

[ember]: http://emberjs.com/
[mutable]: http://emberjs.com/api/classes/Ember.MutableArray.html
[npm]: https://www.npmjs.com/
[cli]: http://www.ember-cli.com/
