import Ember from 'ember';

var ProjectNewRoute = Ember.Route.extend({
  model: function() {
      return Ember.RSVP.hash({
      users: this.store.findAll('user'),
      project: this.store.createRecord('project', {name: "asdasd"})
    });
  },
  users: function() {
    return this.store.findRecord('user');
  },
  actions: {
    create: function(model) {
            console.log("ACTION");
            console.log(model);
			var that = this;
			/*this.pouch.POST(model).then(function(){
				that.transitionTo('photos');				
			});*/
    },
    cancel: function() {
      this.transitionTo('projects');
      return true;
    }
  }
});

export default ProjectNewRoute;