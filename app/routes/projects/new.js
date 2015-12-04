import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import _ from 'lodash/lodash';

const { service } = Ember.inject;

var ProjectNewRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
    var _users = this.store.findAll('user');

    return Ember.RSVP.hash({
    users: _users,
    project: this.store.createRecord('project')
  });
  },
  actions: {
    cancel: function() {
      this.transitionTo('projects');
      return true;
    }
  }
});

export default ProjectNewRoute;
