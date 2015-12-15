import Ember from 'ember';

export default Ember.Component.extend({
  title: null,
  priority: null,
  isDone: null,
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
    editTask: function() {
      const flashMessages = Ember.get(this, 'flashMessages');

      var task = this.get('task');
      var id = task.get('id');

      var color = Ember.$("#colorpicker_input_"+id).val();
      var deadline = Ember.$("#datetimepicker_input_"+id).val();
      var title = this.get('title') || task.get('title');
      var text = Ember.$("#text_input_"+id).val();
      var priority = this.get('priority') || task.get('priority');
      var isDone = this.get('isDone') || task.get('isDone');

      /*console.log(title);
      console.log(text);
      console.log(deadline);
      console.log(isDone);

      console.log(this.get('addedUsers'));
      console.log(this.get('removedUsers'));
*/
      var users = task.get('assignedUsers');
      this.get('addedUsers').forEach(function(item) {
        users.addObject(item);
      });
      this.get('removedUsers').forEach(function(item) {
        users.removeObject(item);
      });

      task.set('color', color);
      task.set('deadline',deadline);
      task.set('title', title);
      task.set('text', text);
      task.set('priority',priority);
      task.set('isDone',isDone);
      //task.save();
      //Ember.$('#task_edit_modal_'+id).modal('toggle');
      //flashMessages.success('Task updated!', {timeout: 5000});

      var that = this;

      var successSave = function() {
        Ember.$('#task_edit_modal_'+id).modal('toggle');
        flashMessages.success('Task updated!', {timeout: 5000});
      };

      var errorSave = function() {
        // handle the error
        that.set('errorMessage','Could not edit/save task!');
      };

      task.save().then(successSave, errorSave);
    },

    titleChanged(value) {
      this.set('title', value);
    },
    priorityChanged(value) {
      this.set('priority', value);
    },
    isDoneChanged(value) {
      this.set('isDone', value);
    }
  }
});
