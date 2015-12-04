import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return Ember.RSVP.hash({
      project: this.store.findRecord('project', params.project_id),
      tasks: this.store.findAll('task')
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    var project = model;
    if (model.project) {
      project = model.project;
    }
    controller.set('model.project', project);
    controller.set('model.tasks', this.store.findAll('task'));
  }
});
