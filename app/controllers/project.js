import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  actions: {
    deleteProject: function() {
      var project = this.get('model');

      if(project) {
        var self = this;
        var onSuccess = function(project) {
          Ember.get(self, 'flashMessages').success('Project deleted!', {timeout: 5000});
          self.transitionToRoute('projects');
        };

        var onFail = function(project) {
          Ember.get(self, 'flashMessages').danger('You are not allowed to delete this project!', {timeout: 5000});
        };

        project.destroyRecord().then(onSuccess, onFail);

      }
    },
    createTask: function() {
      var task = this.get('model.task');
      var project = this.get('model.project');
      const flashMessages = Ember.get(this, 'flashMessages');

      var self = this;
      var auth = Ember.get(document.cookie.match(/authToken\=([^;]*)/), "1");

      Ember.$.ajax({
        context: this,
        url: 'http://group-collab-api.herokuapp.com/api/projects/'+project.id+'/tasks',
        type: 'POST',
        /*headers: {
         'Authorization':'Basic ' + auth
         },*/
        //data: data,
        data: JSON.stringify({ task: {
          title: task.title,
          text: task.text,
          assignedUsers: task.assignedUsers
        }
        }),
        headers: {
          'Authorization':'Basic ' + auth
        },
        contentType: 'application/json',
        dataType: 'json'
      }).then(function(response) {
        flashMessages.success('Task saved!', {timeout: 5000});
        self.transitionToRoute('project', project);

      }, function(xhr, status, error) {
        //var response = xhr.responseText;
        flashMessages.danger('Task could not save!', {timeout: 5000});
        //console.log(status);
        //console.log(error);
      });

    }
  }
});
