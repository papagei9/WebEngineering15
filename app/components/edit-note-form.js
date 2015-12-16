import Ember from 'ember';

export default Ember.Component.extend({
  title: null,
  priority: null,
  isDone: null,

  actions: {
    editNote: function() {
      const flashMessages = Ember.get(this, 'flashMessages');

      var note = this.get('note');
      var id = note.get('id');

      var color = Ember.$("#note_colorpicker_input_"+id).val();
      var text = Ember.$("#note_text_input_"+id).val();

      note.set('color', color);
      note.set('text', text);

      var that = this;

      var noteSuccessSave = function() {
        var _id = "#note_edit_modal_"+id;
        Ember.$(_id).modal('toggle');
        flashMessages.success('Note updated!', {timeout: 5000});
      };

      var noteErrorSave = function() {
        // handle the error
        that.set('errorMessage','Could not edit/save note!');
      };

      note.save().then(noteSuccessSave, noteErrorSave);
    }
  }
});
