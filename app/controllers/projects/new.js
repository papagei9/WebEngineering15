import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    create: function() {
      var project = this.get('model.project');
      const flashMessages = Ember.get(this, 'flashMessages');

      var self = this;

      var onSuccess = function(post) {
        flashMessages.success('Project saved!', {timeout: 5000});
        self.transitionToRoute('project', project);
      };

      var onFail = function(post) {
        flashMessages.danger('Project could not save!', {timeout: 5000});
      };

      project.save().then(onSuccess, onFail);

    }
  }
});
