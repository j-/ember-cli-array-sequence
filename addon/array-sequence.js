import Em from 'ember';
var get = Em.get;

var ArraySequence = Em.Object.extend(Em.MutableArray, {
	offset: 0,
	step: 1,

	content: function () {
		return Em.A();
	}.property(),

	objectAt: function (idx) {
		if (idx < 0 || idx >= get(this, 'length')) {
			return undefined;
		}
		return get(this, 'content').objectAt(idx);
	},

	length: function (key, length, old) {
		var content = get(this, 'content');
		// default value
		if (arguments.length <= 1) {
			return get(content, 'length') || 0;
		}
		// setter
		length = Math.max(0, length) || 0;
		old = Math.max(0, old) || 0;
		var offset = get(this, 'offset');
		var step = get(this, 'step');
		// difference between old and new values
		// positive value = added items
		// negative value = removed items
		var diff = length - old;
		var addedCount = Math.max(0, diff);
		var removedCount = Math.max(0, -diff);
		var startIndex = Math.max(0, old - removedCount);
		var newItems = [];
		var index;
		for (var i = 0; i < addedCount; i++) {
			index = i + old;
			newItems.push(index * step + offset);
		}
		this.arrayContentWillChange(startIndex, removedCount, addedCount);
		content.replace(startIndex, removedCount, newItems);
		this.arrayContentDidChange(startIndex, removedCount, addedCount);
		return length;
	}.property('content.length')
});

export default ArraySequence;
