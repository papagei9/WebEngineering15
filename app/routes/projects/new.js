import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

var ProjectNewRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),

  model: function() {
      return Ember.RSVP.hash({
      users: this.store.findAll('user'), //TODO: exclude owner
      project: this.store.createRecord('project')
    });
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
