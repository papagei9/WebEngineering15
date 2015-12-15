import Ember from 'ember';

export default Ember.Component.extend({
  title: null,
  priority: null,
  isDone: null,

  actions: {
    editNote: function() {
      const flashMessages = Ember.get(this, 'flashMessages');

      //this.set('users', this.get('task').get('assignedUsers'));
      alert('editNote');

      var note = this.get('note');
      var id = note.get('id');

      var color = Ember.$("#note_colorpicker_input_"+id).val();
      var text = Ember.$("#note_text_input_"+id).val();

      console.log(text);

      note.set('color', color);
      note.set('text', text);
      note.save().then(successSave, errorSave);

      var that = this;

      var successSave = function(data) {
        Ember.$('#note_edit_modal_'+id).modal('toggle');
        flashMessages.success('Note updated!', {timeout: 5000});
      };

      var errorSave = function(response) {
        // handle the error
        console.log(response);
        that.set('errorMessage','Could not edit/save note!');
      };
    }
  }
});
