import Ember from 'ember';

export default Ember.Component.extend({
  name: null,
  isPublic: null,
  addedUsers: [],
  removedUsers: [],

  actions: {
    addRemoveUser: function(user, action) {
      if(action === 'add') {
        if(this.get('addedUsers').indexOf(user) === -1) {
          this.get('addedUsers').push(user);
        }
        if(this.get('removedUsers').indexOf(user) > -1) {
          this.get('removedUsers').splice(this.get('removedUsers').indexOf(user), 1);
        }
      } else
      if(action === 'remove') {
        if(this.get('addedUsers').indexOf(user) > -1) {
          this.get('addedUsers').splice(this.get('removedUsers').indexOf(user), 1);
        }
        if(this.get('removedUsers').indexOf(user) === -1) {
          this.get('removedUsers').push(user);
        }
      }
    },
    editProject: function() {
      const flashMessages = Ember.get(this, 'flashMessages');

      var project = this.get('project');
      var id = project.get('id');

      var name = this.get('name') || project.get('name');
      var isPublic = this.get('isPublic') || project.get('isPublic');

      var users = project.get('members');
      this.get('addedUsers').forEach(function(item) {
        users.addObject(item);
      });
      this.get('removedUsers').forEach(function(item) {
        users.removeObject(item);
      });

      project.set('name', name);
      project.set('isPublic',isPublic);

      var that = this;

      var projectSuccessSave = function() {
        Ember.$('#project_modal').modal('toggle');
        flashMessages.success('Project updated!', {timeout: 5000});
      };

      var projectErrorSave = function() {
        // handle the error
        that.set('errorMessage','Could not edit/save project!');
      };

      project.save().then(projectSuccessSave, projectErrorSave);
    },

    nameChanged(value) {
      this.set('name', value);
    },
    isPublicChanged(value) {
      this.set('isPublic', value);
    }
  }
});
