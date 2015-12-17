import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return Ember.RSVP.hash({
      project: this.store.findRecord('project', params.project_id),
      //notes: this.store.findAll('note', {reload:true})
      //tasks: this.store.findAll('task')
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    var project = model;
    if (model.project) {
      project = model.project;
    }
    controller.set('model.project', project);
    controller.set('model.users', this.store.findAll('user'));
    controller.set('model.tasks', this.store.findAll('task'));
    controller.set('model.notes', this.store.findAll('note'));
    controller.set('model.comments', this.store.findAll('comment'));
    controller.set('model.task', this.store.createRecord('task', {priority:'low'}));
    //controller.set('model.note', this.store.createRecord('note'));
    controller.set('model.comment', this.store.createRecord('comment'));
  }
});
