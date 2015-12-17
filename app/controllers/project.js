import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  projectBus: Ember.inject.service('project-bus'),
  actions: {
    joinProject: function(project) {
      this.get('projectBus').joinProject(project);
    },
    leaveProject: function(project) {
      this.get('projectBus').leaveProject(project);
    },
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

        Ember.$(".delete_modal").modal('hide');

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

        Ember.$(".delete_modal").modal('hide');

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
    priorityChanged: function(value) {
      this.get('model.task').set('priority',value);
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
      }).then(function(answer) {
        flashMessages.success('Task saved!', {timeout: 5000});
        //self.transitionToRoute('project', project);
        Ember.$("#task_form").trigger("reset");
        Ember.$('#task_modal').modal('toggle');

        self.store.findRecord('task', answer.task._id);

      }, function() {
        this.set('errorMessage', "Task could not save!");
      });

    },
    createNote: function() {
      //var note = this.get('model.note');

      var note = this.getProperties('note_text', 'note_color');

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
          //color: note.get("color"),
          color: note.note_color,
          //text:  note.get("text")
          text: note.note_text
        }
        }),
        headers: {
          'Authorization':'Basic ' + cookie
        },
        contentType: 'application/json',
        dataType: 'json'
      }).then(function(answer) {
        flashMessages.success('Note saved!', {timeout: 5000});
        Ember.$('#note_modal').modal('hide');
        Ember.$("#note_form").trigger("reset");
        Ember.$("#colorpicker2_input").val("#ffffff");

        //reload
        self.store.findRecord('note', answer.note._id);

      }, function() {
        this.set('errorMessage', "Note could not save!");
      });
    }
  }
});
