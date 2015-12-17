import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.findRecord('user', Ember.$.cookie('user_id') );
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('projects', this.store.findAll('project'));
  }
});
