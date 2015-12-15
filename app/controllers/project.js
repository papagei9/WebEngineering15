import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  actions: {
    deleteProject: function() {
      var project = this.get('model.project');

      if(project) {
        var self = this;
        var onSuccess = function() {
          Ember.get(self, 'flashMessages').success('Project deleted!', {timeout: 5000});
          self.transitionToRoute('projects');
        };

        var onFail = function() {
          Ember.get(self, 'flashMessages').danger('You are not allowed to delete this project!', {timeout: 5000});
        };

        project.destroyRecord().then(onSuccess, onFail);

      }
    },
    deleteTask: function(task) {
      if(task) {

        var self = this;
        var onSuccess = function() {
          Ember.get(self, 'flashMessages').success('Task deleted!', {timeout: 5000});
        };

        var onFail = function() {
          Ember.get(self, 'flashMessages').danger('You are not allowed to delete this task!', {timeout: 5000});
        };

        task.destroyRecord().then(onSuccess, onFail);
      }
    },
    deleteNote: function(note) {
      if(note) {

        var self = this;
        var onSuccess = function() {
          Ember.get(self, 'flashMessages').success('Note deleted!', {timeout: 5000});
        };

        var onFail = function() {
          Ember.get(self, 'flashMessages').danger('You are not allowed to delete this note!', {timeout: 5000});
        };

        note.destroyRecord().then(onSuccess, onFail);
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

      var self = this;
      var cookie = Ember.$.cookie('authToken');
      Ember.$.ajax({
        context: this,
        url: 'http://group-collab-api.herokuapp.com/api/projects/'+project.id+'/tasks',
        type: 'POST',
        data: JSON.stringify({ task: {
          title: task.get("title"),
          text: task.get("text"),
          color: task.get("color"),
          deadline: task.get("deadline"),
          isDone: task.get("isDone"),
          priority: task.get("priority"),
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
        Ember.$("#task_form").trigger("reset");
        Ember.$('#task_modal').modal('toggle');

      }, function(xhr, status, error) {
        //var response = xhr.responseText;
        //flashMessages.danger('Task could not save!', {timeout: 5000});
        //self.transitionToRoute('project', project);
        this.set('errorMessage', "Task could not save!");
        //console.log(status);
        //console.log(error);
      });

    },
    createNote: function() {
      var note = this.get('model.note');

      var project = this.get('model.project');
      const flashMessages = Ember.get(this, 'flashMessages');


      var self = this;
      var cookie = Ember.$.cookie('authToken');
      Ember.$.ajax({
        context: this,
        url: 'http://group-collab-api.herokuapp.com/api/projects/'+project.id+'/notes',
        type: 'POST',
        //data: data,
        data: JSON.stringify({ note: {
          color: note.get("color"),
          text:  note.get("text")
        }
        }),
        headers: {
          'Authorization':'Basic ' + cookie
        },
        contentType: 'application/json',
        dataType: 'json'
      }).then(function(response) {
        flashMessages.success('Note saved!', {timeout: 5000});
        self.transitionToRoute('project', project);
        Ember.$("#note_form").trigger("reset");
        Ember.$('#note_modal').modal('toggle');

      }, function(xhr, status, error) {
        //var response = xhr.responseText;
        //flashMessages.danger('Task could not save!', {timeout: 5000});
        //self.transitionToRoute('project', project);
        this.set('errorMessage', "Note could not save!");
        //console.log(status);
        //console.log(error);
      });

    }
  }
});
