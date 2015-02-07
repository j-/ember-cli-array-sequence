import Em from 'ember';
import ArraySequence from 'array-sequence';

var IndexController = Em.Controller.extend({
	sequence: function () {
		return ArraySequence.create();
	}.property(),

	actions: {
		len: function (inc) {
			this.get('sequence').incrementProperty('length', inc);
		},
		offset: function (inc) {
			this.get('sequence').incrementProperty('offset', inc);
		},
		step: function (inc) {
			this.get('sequence').incrementProperty('step', inc);
		}
	}
});

export default IndexController;
