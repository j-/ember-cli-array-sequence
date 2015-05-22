import Em from 'ember';
import ArraySequence from 'array-sequence';

var IndexController = Em.Controller.extend({
	seq: ArraySequence.create({
		offset: 50,
		increment: 10,
		limit: 10
	}),

	actions: {
		offset: function (inc) {
			this.incrementProperty('seq.offset', inc);
		},
		limit: function (inc) {
			this.incrementProperty('seq.limit', inc);
		}
	}
});

export default IndexController;
