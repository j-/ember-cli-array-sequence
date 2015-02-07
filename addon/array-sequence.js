import Em from 'ember';
var get = Em.get;

var ArraySequence = Em.Object.extend(Em.MutableArray, {
	offset: 0,

	content: function () {
		return Em.A();
	}.property(),

	objectAt: function (idx) {
		if (idx < 0 || idx >= get(this, 'length')) {
			return undefined;
		}
		return get(this, 'content').objectAt(idx) + (get(this, 'offset') || 0);
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
		// difference between old and new values
		// positive value = added items
		// negative value = removed items
		var diff = length - old;
		var addedCount = Math.max(0, diff);
		var removedCount = Math.max(0, -diff);
		var startIndex = Math.max(0, old - removedCount);
		var newItems = [];
		for (var i = 0; i < addedCount; i++) {
			newItems.push(i + old);
		}
		this.arrayContentWillChange(startIndex, removedCount, addedCount);
		content.replace(startIndex, removedCount, newItems);
		this.arrayContentDidChange(startIndex, removedCount, addedCount);
		return length;
	}.property('content.length')
});

export default ArraySequence;
