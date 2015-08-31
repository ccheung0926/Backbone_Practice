var app = app || {};
// The Application
// ---------------
// Our overall **AppView** is the top-level piece of UI.
app.AppView = Backbone.View.extend({
// Instead of generating a new element, bind to the existing skeleton of
// the app already present in the HTML.
	el: '#todoapp',
	statsTemplate: _.template( $('#stats-template').html() ),
	events: {
		'keypress #new-todo': 'createdOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all':'toggleAllComplete'
	},
	// At initialization we bind to the relevant events on the `Todos`
	// collection, when items are added or changed.Kick things off by
	// loading any preexisting todos that might be saved in *localStorage*.
	initialize: function(){
		this.allCheckbox = this.$('#toogle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);

		//New
		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll);
		this.listenTo(app.Todos, 'all', this.render);

		app.Todos.fetch();
	},
	//New
	// Rerendering the app just means refreshing the statistics -- the rest
	// of the app doesn't change.
	render: function(){
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		if(app.Todos.length){
			this.$main.show();
			this.$footer.show();

			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));
			this.$('#filter li a')
				.removeClas('selected')
				.filter('[href=#/'+(app.TodoFilter))//pg. 82
		}
	}
	// Add a single todo item to the list by creating a view for it, and
	// appending its element to the `<ul>`.
	addOne: function( todo ){
		var view = new app.TodoView({ model: todo });
		$('#todo-list').append( view.render().el );
	},
	// Add all items in the **Todos** collection at once.
	addAll: function(){
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	}
});






