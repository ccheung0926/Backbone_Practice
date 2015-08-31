var app = app || {};

app.Todo = Backbone.Model.extend({
	// Default attributes ensure that each todo created has title and
	// 'completed' keys.
	defaults:{
		title: '',
		completed: false
	},
	// toggle the 'completed' state of this todo item.
	toogle: function(){
		this.save({
			completed: !this.get('completed')
		});
	}
})