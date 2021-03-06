import Em from 'ember';
var get = Em.get;

var ArraySequence = Em.Object.extend(Em.MutableArray, {
	offset: 0,
	length: 0,
	increment: 1,

	objectAt: function (idx) {
		var offset = this.get('offset');
		var increment = this.get('increment');
		var limit = this.get('limit');
		if (idx < 0 || idx >= limit) {
			return undefined;
		}
		var result = offset + idx * increment;
		return result;
	},

	limit: function (key, value) {
		value = Number(value);
		var old = this.get('length') || 0;
		var length = Math.max(value || 0, 0);
		var diff = length - old;
		if (diff === 0) {
			return length;
		}
		var removedCount = Math.abs(Math.min(diff, 0));
		var addedCount = Math.max(diff, 0);
		var index = old - removedCount;
		this.arrayContentWillChange(index, removedCount, addedCount);
		this.set('length', length);
		this.arrayContentDidChange(index, removedCount, addedCount);
		return length;
	}.property(),

	content: function () {
		var offset = this.get('offset');
		var increment = this.get('increment');
		var limit = this.get('limit');
		var result = [];
		for (var i = offset; i < limit; i += increment) {
			result.push(i);
		}
		return result;
	}.property('offset', 'limit', 'increment')
});

export default ArraySequence;
