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

      var usersArray = [];
      task.get("assignedUsers").forEach(function(u) {
        usersArray.push(u.get("id"));
      });
      console.log(usersArray);

      var self = this;
      var cookie = Ember.$.cookie('authToken');
      Ember.$.ajax({
        context: this,
        url: 'http://group-collab-api.herokuapp.com/api/projects/'+project.id+'/tasks',
        type: 'POST',
        //data: data,
        data: JSON.stringify({ task: {
          title: task.get("title"),
          text: task.get("text"),
          assignedUsers: usersArray
        }
        }),
        headers: {
          'Authorization':'Basic ' + cookie
        },
        contentType: 'application/json',
        dataType: 'json'
      }).then(function(response) {
        flashMessages.success('Task saved!', {timeout: 5000});
        self.transitionToRoute('project', project);

      }, function(xhr, status, error) {
        //var response = xhr.responseText;
        flashMessages.danger('Task could not save!', {timeout: 5000});
        self.transitionToRoute('project', project);
        //console.log(status);
        //console.log(error);
      });

    }
  }
});
