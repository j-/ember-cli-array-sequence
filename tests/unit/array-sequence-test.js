import Em from 'ember';
import { test } from 'ember-qunit';
import ArraySequence from 'array-sequence';

test('constructor exists', function () {
	ok(ArraySequence, 'ArraySequence is not null or undefined');
	equal(typeof ArraySequence, 'function', 'ArraySequence is function');
});

test('initializes with length', function () {
	var seq = ArraySequence.create({
		length: 5
	});
	equal(seq.get('length'), 5);
});

test('initializes with items', function () {
	var seq = ArraySequence.create({
		length: 3
	});
	equal(seq.objectAt(0), 0);
	equal(seq.objectAt(1), 1);
	equal(seq.objectAt(2), 2);
});

test('initializes with offset', function () {
	var seq = ArraySequence.create({
		offset: 1,
		length: 3
	});
	equal(seq.get('offset'), 1);
	equal(seq.objectAt(0), 1);
	equal(seq.objectAt(1), 2);
	equal(seq.objectAt(2), 3);
});

test('can increment length', function () {
	var seq = ArraySequence.create({
		length: 3
	});
	equal(seq.get('length'), 3);
	seq.incrementProperty('length');
	equal(seq.get('length'), 4);
});

test('generates new items', function () {
	var seq = ArraySequence.create({
		length: 3
	});
	equal(seq.get('length'), 3);
	seq.incrementProperty('length', 3);
	equal(seq.get('length'), 6);
	equal(seq.objectAt(3), 3);
	equal(seq.objectAt(4), 4);
	equal(seq.objectAt(5), 5);
});

test('removes old items', function () {
	var seq = ArraySequence.create({
		length: 6
	});
	equal(seq.get('length'), 6);
	seq.decrementProperty('length', 3);
	equal(seq.get('length'), 3);
	notEqual(seq.objectAt(3), 3);
	notEqual(seq.objectAt(4), 4);
	notEqual(seq.objectAt(5), 5);
});

test('length cannot be negative', function () {
	var seq = ArraySequence.create({
		length: -1
	});
	notEqual(seq.get('length'), -1, 'length cannot be negative');
	equal(seq.get('length'), 0, 'length must be zero');
	seq.set('length', -2);
	equal(seq.get('length'), 0);
});

test('length can be decreased and increased again', function () {
	var seq = ArraySequence.create({
		length: 3
	});
	equal(seq.objectAt(2), 2);
	seq.set('length', 0);
	notEqual(seq.objectAt(2), 2);
	seq.set('length', 3);
	equal(seq.objectAt(2), 2);
});

test('content matches length', function () {
	var seq = ArraySequence.create({
		length: 2
	});
	seq.set('length', 1);
	equal(seq.get('content.length'), 1);
	deepEqual(seq.get('content'), [0]);
});

test('values outside of boundaries return undefined', function () {
	var seq = ArraySequence.create({
		length: 5
	});
	equal(seq.objectAt(-5), undefined, 'negative index must return undefined');
	equal(seq.objectAt(5), undefined, 'index equal to length must return undefined');
	equal(seq.objectAt(10), undefined, 'index greater than length must return undefined');
});
