import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.store.findAll('project');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    var project = model;
    if (model.project) {
      project = model.project;
    }
    controller.set('user', this.store.findRecord('user', Ember.$.cookie('user_id')));
    controller.set('model', this.store.findAll('project'));
  }
});
