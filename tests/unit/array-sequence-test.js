import Em from 'ember';
import { test } from 'ember-qunit';
import ArraySequence from 'array-sequence';

test('constructor exists', function () {
	ok(ArraySequence, 'ArraySequence is not null or undefined');
	equal(typeof ArraySequence, 'function', 'ArraySequence is function');
});

test('initializes with limit', function () {
	var seq = ArraySequence.create({
		limit: 5
	});
	equal(seq.get('limit'), 5);
});

test('initializes with items', function () {
	var seq = ArraySequence.create({
		limit: 3
	});
	equal(seq.objectAt(0), 0);
	equal(seq.objectAt(1), 1);
	equal(seq.objectAt(2), 2);
});

test('initializes with offset', function () {
	var seq = ArraySequence.create({
		offset: 1,
		limit: 3
	});
	equal(seq.get('offset'), 1);
	equal(seq.objectAt(0), 1);
	equal(seq.objectAt(1), 2);
	equal(seq.objectAt(2), 3);
});

test('can increment limit', function () {
	var seq = ArraySequence.create({
		limit: 3
	});
	equal(seq.get('limit'), 3);
	seq.incrementProperty('limit');
	equal(seq.get('limit'), 4);
});

test('generates new items', function () {
	var seq = ArraySequence.create({
		limit: 3
	});
	equal(seq.get('limit'), 3);
	seq.incrementProperty('limit', 3);
	equal(seq.get('limit'), 6);
	equal(seq.objectAt(3), 3);
	equal(seq.objectAt(4), 4);
	equal(seq.objectAt(5), 5);
});

test('removes old items', function () {
	var seq = ArraySequence.create({
		limit: 6
	});
	equal(seq.get('limit'), 6);
	seq.decrementProperty('limit', 3);
	equal(seq.get('limit'), 3);
	notEqual(seq.objectAt(3), 3);
	notEqual(seq.objectAt(4), 4);
	notEqual(seq.objectAt(5), 5);
});

test('limit cannot be negative', function () {
	var seq = ArraySequence.create({
		limit: -1
	});
	notEqual(seq.get('limit'), -1, 'limit cannot be negative');
	equal(seq.get('limit'), 0, 'limit must be zero');
	seq.set('limit', -2);
	equal(seq.get('limit'), 0);
});

test('limit can be decreased and increased again', function () {
	var seq = ArraySequence.create({
		limit: 3
	});
	equal(seq.objectAt(2), 2);
	seq.set('limit', 0);
	notEqual(seq.objectAt(2), 2);
	seq.set('limit', 3);
	equal(seq.objectAt(2), 2);
});

test('content matches limit', function () {
	var seq = ArraySequence.create({
		limit: 2
	});
	seq.set('limit', 1);
	equal(seq.get('content.length'), 1);
	deepEqual(seq.get('content'), [0]);
});

test('values outside of boundaries return undefined', function () {
	var seq = ArraySequence.create({
		limit: 5
	});
	equal(seq.objectAt(-5), undefined, 'negative index must return undefined');
	equal(seq.objectAt(5), undefined, 'index equal to limit must return undefined');
	equal(seq.objectAt(10), undefined, 'index greater than limit must return undefined');
});
