import Ember from 'ember';

var ProjectNewRoute = Ember.Route.extend({
  actions: {
    create: function(model) {
			var that = this;
			/*this.pouch.POST(model).then(function(){
				that.transitionTo('photos');				
			});*/
    },
    cancel: function() {
      this.transitionTo('projects');
      return true;
    }
  },
  model: function() {
    // provide a new project to the template
    var project = this.store.createRecord('project', {});
    return project;
  }
});

export default ProjectNewRoute;