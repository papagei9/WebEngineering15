import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  actions: {
    create: function() {
      var project = this.get('model.project');
      const flashMessages = Ember.get(this, 'flashMessages');

      var self = this;

      var onSuccess = function() {
        flashMessages.success('Project saved!', {timeout: 5000});
        self.transitionToRoute('project', project);
      };

      var onFail = function() {
        flashMessages.danger('Project could not save!', {timeout: 5000});
      };

      this.get('sessionAccount').get('account').then(function(owner) {
        project.get('members').addObject(owner);
        project.save().then(onSuccess, onFail);
      });

    }
  }
});
