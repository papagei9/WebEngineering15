import Ember from "ember";

var MyProjectsController = Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  projectBus: Ember.inject.service('project-bus'),
  actions: {
    joinProject: function(project) {
      this.get('projectBus').joinProject(project);
    },
    leaveProject: function(project) {
      this.get('projectBus').leaveProject(project);
    }
  }
});

export default MyProjectsController;
